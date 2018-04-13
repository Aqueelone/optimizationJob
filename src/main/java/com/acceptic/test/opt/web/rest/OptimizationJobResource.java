package com.acceptic.test.opt.web.rest;

import com.acceptic.test.opt.domain.*;
import com.acceptic.test.opt.domain.enumeration.EventType;
import com.acceptic.test.opt.domain.enumeration.ResultSet;
import com.acceptic.test.opt.repository.*;
import com.acceptic.test.opt.service.CampaignRecordService;
import com.acceptic.test.opt.service.EventService;
import com.acceptic.test.opt.service.dto.CampaignRecordDTO;
import com.acceptic.test.opt.service.dto.EventDTO;
import com.acceptic.test.opt.service.mapper.CampaignRecordMapper;
import com.acceptic.test.opt.service.mapper.EventMapper;
import com.acceptic.test.opt.web.rest.util.CounterMap;
import com.acceptic.test.opt.web.rest.util.ModifyTreeMap;
import com.codahale.metrics.annotation.Timed;
import org.hibernate.cfg.NotYetImplementedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.beans.Expression;
import java.time.Instant;
import java.util.*;
import java.util.function.Supplier;

import static java.util.Optional.*;

/**
 * OptimizationJob controller
 */
@RestController
@RequestMapping("/api/optimization-job")
@Timed
public class OptimizationJobResource {

    private final Logger log = LoggerFactory.getLogger(OptimizationJobResource.class);

    private final EventRepository eventRepository;
    private final CampaignRepository campaignRepository;
    private final PublisherRepository publisherRepository;
    private final CampaignRecordRepository campaignRecordRepository;
    private final OptimizationPropsRepository optimizationPropsRepository;
    private final BlackListRepository blackListRepository;
    private final BlackListRecordRepository blackListRecordRepository;

    private final CampaignRecordMapper campaignRecordMapper;
    private final EventMapper eventMapper;
    private CounterMap<ResultSet> resultArr= new CounterMap<>(ResultSet.class);

    /**
     * Controller which provide the optimization task
     *
     * @param eventRepository the hibernate event repository
     * @param campaignRepository the hibernate campaign repository
     * @param publisherRepository the hibernate publisher repository
     * @param campaignRecordRepository the hibernate campaignRecord repository
     * @param optimizationPropsRepository the hibernate optimizationProps repository
     * @param blackListRepository the hibernate blackList repository
     * @param blackListRecordRepository the hibernate blackListRecord repository
     * @param campaignRecordMapper the hibernate campaignRecord mapper
     * @param eventMapper the hibernate event mapper
     */
    OptimizationJobResource(EventRepository eventRepository, CampaignRepository campaignRepository,
                            PublisherRepository publisherRepository, CampaignRecordRepository campaignRecordRepository,
                            OptimizationPropsRepository optimizationPropsRepository,
                            BlackListRepository blackListRepository, BlackListRecordRepository blackListRecordRepository,
                            CampaignRecordMapper campaignRecordMapper, EventMapper eventMapper){
        this.eventRepository = eventRepository;
        this.campaignRepository = campaignRepository;
        this.publisherRepository = publisherRepository;
        this.campaignRecordRepository = campaignRecordRepository;
        this.optimizationPropsRepository = optimizationPropsRepository;
        this.blackListRepository = blackListRepository;
        this.blackListRecordRepository = blackListRecordRepository;
        this.campaignRecordMapper = campaignRecordMapper;
        this.eventMapper = eventMapper;
    }

    /**
     * GET run
     */
    @GetMapping("/run")
    public ResponseEntity run() throws Exception {

        ModifyTreeMap<CampaignRecordDTO, CounterMap<EventType>> stateTree = new ModifyTreeMap<>();

        Instant instNow = Instant.now();
        Long deltaInst = 3600L*24L*14L;
        TreeSet<EventDTO> events = new TreeSet<>();

        try {
            eventRepository.findAllByCreatedBetween(instNow.minusSeconds(deltaInst), instNow).get()
                .forEach(event -> events.add(eventMapper.toDto(event)));
            log.debug("Received events are {}", events);
        }
        catch (Exception e) {
            log.debug(e.getLocalizedMessage(), e);
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        for (EventDTO event : events
            ) {
            log.debug("Start processing event: {}", event);

            CampaignRecordDTO campaignRecordDTO = getCampaignRecordDTObyevent(event);

            CounterMap<EventType> thresholdState = Optional.ofNullable(stateTree.get(campaignRecordDTO))
                .orElse(new CounterMap<>(EventType.class));

            EventType eventType = getEventType(eventRepository.findOne(event.getId()));
            stateTree.replace(campaignRecordDTO, thresholdState.increment(eventType));
        }

        stateTree.forEach((key, value) -> log.debug("record from stateTree {} {}", key, value));
        validateBlackList(stateTree);
        return new ResponseEntity(resultArr, HttpStatus.OK);
    }

    private CampaignRecordDTO getCampaignRecordDTObyevent(EventDTO event) {
        Campaign campaign = campaignRepository.findOne(event.getCampaignId());
        Publisher publisher = publisherRepository.findOne(event.getPublisherId());
        CampaignRecord campaignRecord = campaignRecordRepository
            .findCampaignRecordByCampaignAndPublisher(campaign, publisher).get();
        return campaignRecordMapper.toDto(campaignRecord);
    }

    /**
     * Getting EventType by Event and Campaign Props
     *
     * @param event event which we have processed
     * @return EventType: EventType.SOURCE_EVENT or EventType.MEASURED_EVENT
     */
    private EventType getEventType(Event event) {
        EventType eventType;
        String type = event.getType();
        Campaign campaign = campaignRepository.findOne(event.getCampaign().getId());
        OptimizationProps optimizationProps = optimizationPropsRepository.findOne(campaign.getOptimizationProps().getId());
        if(type.equals(optimizationProps.getSourceEvent())) eventType = EventType.SOURCE_EVENT;
        else if(type.equals(optimizationProps.getMeasuredEvent())) eventType = EventType.MEASURED_EVENT;
        else {
            throw new NotYetImplementedException();
        }
        log.debug("Event {} have {} type!", event, eventType);
        return eventType;
    }

    /**
     * Computing temporary data holder and validate result with invoke checking all blacklist for modify
     * if this is necessity
     *
     * @param stateTree temporary data holder
     */
    private void validateBlackList(ModifyTreeMap<CampaignRecordDTO, CounterMap<EventType>> stateTree) {
        NavigableSet<CampaignRecordDTO> navigableSet = stateTree.navigableKeySet();
        log.debug("Start analyze records {}", navigableSet);
        navigableSet.parallelStream().forEach(key -> checkBlackList(key.getCampaignId(), key.getPublisherId(), stateTree.get(key)));
    }

    /**
     * Checking the blacklist which is suitable to the certain campaign and the certain publisher
     *
     * @param campaignId id of campaign which we do checking
     * @param publisherId id of publisher which we do checking
     * @param value result value of calculating how many events by certain type (by EventType enum) we have
     */
    private void checkBlackList(Long campaignId, Long publisherId, CounterMap<EventType> value) {
        Long sEventsAll = Optional.ofNullable(value.get(EventType.SOURCE_EVENT)).orElse(1L);
        Long mEventsAll = Optional.ofNullable(value.get(EventType.MEASURED_EVENT)).orElse(0L);
        Campaign campaign = campaignRepository.findOne(campaignId);
        Publisher publisher = publisherRepository.findOne(publisherId);
        BlackList blackList = blackListRepository.findOne(campaign.getBlacklist().getId());
        OptimizationProps optimizationProps = optimizationPropsRepository.findOne(campaign.getOptimizationProps().getId());
        Long threshold = optimizationProps.getThreshold();
        Float ratioThreshold = optimizationProps.getRatioThreshold();
        boolean inBlackList = Optional.ofNullable(blackListRecordRepository
            .findBlackListRecordByBlackListAndPublisher(blackList, publisher)).get().isPresent();

        log.debug("Campaign {} have publisher {}", campaign, publisher);
        log.debug("with sourceEvent: {} and measureEvent: {}", sEventsAll, mEventsAll);
        log.debug("and in blacklist present: {}", inBlackList);

        log.debug("Check threshold {}", threshold);
        if (sEventsAll < threshold) {
            if (inBlackList) removeFromBlackList(blackList, publisher);
        } else {
            Float realRatio = (mEventsAll.floatValue() / sEventsAll.floatValue())*100.00F;//TODO Is ratio in percent?
            log.debug("Check ratioThreshold {} when real compiled as {}%", ratioThreshold, realRatio);
            if(realRatio < ratioThreshold){
                if(!inBlackList) addToBlackList(blackList, publisher);
            } else { if(inBlackList) removeFromBlackList(blackList, publisher); }
        }
    }

    /**
     * Remove record from BlackListRecord Repository
     *
     * @param blackList entity
     * @param publisher entity
     */
    private void removeFromBlackList(BlackList blackList, Publisher publisher) {
        BlackListRecord blackListRecord = blackListRecordRepository
            .findBlackListRecordByBlackListAndPublisher(blackList, publisher).get();
        blackListRecordRepository.delete(blackListRecord);
        resultArr.increment(ResultSet.REMOVED);
        log.debug("Publisher {} was removed from blacklist in campaign {}", publisher, campaignRepository.getByBlacklist(blackList));
        //TODO we Could this make publisher remove notification
    }

    /**
     * Add record to BlackListRecord Repository
     *
     * @param blackList entity
     * @param publisher entity
     */
    private void addToBlackList(BlackList blackList, Publisher publisher) {
        BlackListRecord blackListRecord = new BlackListRecord();
        blackListRecord.setBlackList(blackList);
        blackListRecord.setPublisher(publisher);
        blackListRecordRepository.save(blackListRecord);
        resultArr.increment(ResultSet.ADDED);
        log.debug("Publisher {} was added from blacklist in campaign {}", publisher, campaignRepository.getByBlacklist(blackList));
        //TODO we Could this make publisher remove notification
    }
}
