package com.acceptic.test.opt.web.rest;

import com.acceptic.test.opt.OptimizationJobApp;
import com.acceptic.test.opt.domain.*;
import com.acceptic.test.opt.domain.enumeration.EventType;
import com.acceptic.test.opt.domain.enumeration.ResultSet;
import com.acceptic.test.opt.repository.*;
import com.acceptic.test.opt.service.mapper.CampaignRecordMapper;
import com.acceptic.test.opt.service.mapper.EventMapper;
import com.acceptic.test.opt.web.rest.errors.ExceptionTranslator;
import com.acceptic.test.opt.web.rest.util.CounterMap;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;


import javax.persistence.EntityManager;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import static com.acceptic.test.opt.web.rest.TestUtil.createFormattingConversionService;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
/**
 * Test class for the OptimizationJob REST controller.
 *
 * @see OptimizationJobResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OptimizationJobApp.class)
public class OptimizationJobResourceIntTest {

    private static final Long WORKABLE_RANGE = 3600L*24L*14L;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";

    private static final Long DEFAULT_THRESHOLD = 1L;
    private static final Float DEFAULT_RATIO_THRESHOLD = 1F;

    private static final String DEFAULT_SOURCE_EVENT = "AAAAAAAAAA";
    private static final String DEFAULT_MEASURED_EVENT = "BBBBBBBBBB";

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private PublisherRepository publisherRepository;

    @Autowired
    private CampaignRecordRepository campaignRecordRepository;

    @Autowired
    private OptimizationPropsRepository optimizationPropsRepository;

    @Autowired
    private BlackListRepository blackListRepository;

    @Autowired
    private BlackListRecordRepository blackListRecordRepository;

    @Autowired
    private CampaignRecordMapper campaignRecordMapper;

    @Autowired
    private EventMapper eventMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMockMvc;

    private Campaign campaign;

    private Publisher publisher;

    private CounterMap<EventType> eventCounter = new CounterMap<>(EventType.class);

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        OptimizationJobResource optimizationJobResource = new OptimizationJobResource(eventRepository, campaignRepository,
            publisherRepository, campaignRecordRepository, optimizationPropsRepository,
            blackListRepository, blackListRecordRepository, campaignRecordMapper, eventMapper);
        this.restMockMvc = MockMvcBuilders
            .standaloneSetup(optimizationJobResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .build();

        this.eventCounter.put(EventType.SOURCE_EVENT, 0L);
        this.eventCounter.put(EventType.MEASURED_EVENT, 0L);
    }

    /**
     * Create Entities which is necessity for all tests and which is common to all tests
     */
    private void createNecessityEntitiesWhichAreConstant() {
        OptimizationProps optimizationProps = createEntityOptimizationProps(em);
        optimizationProps.threshold(2L);
        optimizationProps.ratioThreshold(30.0F);
        optimizationPropsRepository.save(optimizationProps);
        this.campaign = createCampaign(optimizationProps);
        this.publisher = createEntityPublisher(em);
        publisherRepository.save(publisher);
        addPublisherToCampaign();
    }

    /**
    * Test run when no events in repository
    */
    @Test
    @Transactional
    public void testRunEmpty() throws Exception {
        restMockMvc.perform(get("/api/optimization-job/run"))
            .andExpect(status().isNotFound());
    }

    /**
     * Test run when no events in the work time range in repository
     */
    @Test
    @Transactional
    public void testRunWithOutRangeEvents() throws Exception {
        //Describe test data
        eventCounter.put(EventType.SOURCE_EVENT, 3L);

        Instant from = Instant.now().minusSeconds(2*WORKABLE_RANGE);
        Instant to = Instant.now().minusSeconds(WORKABLE_RANGE -1L);

        //Create campaign, publisher and add publisher to campaign
        createNecessityEntitiesWhichAreConstant();

        //Create set of random events
        createRandomEvent(from, to);

        //Start doing and check the result
        restMockMvc.perform(get("/api/optimization-job/run"))
            .andExpect(status().isNotFound());
    }

    /**
     * Test run when we not add the publisher to blacklist because
     * conditions one is true (sourceEvents less then threshold)
     * conditions two is false (measureEvents less then ratioThreshold percent of sourceEvent)
     *
     */
    @Test
    @Transactional
    public void testRunNotAddedToBlackListByConditionOne() throws Exception {
        //Describe test data
        eventCounter.put(EventType.SOURCE_EVENT, 1L); //less then 2L which we describe when created optimizationsProp entity

        Instant from = Instant.now().minusSeconds(WORKABLE_RANGE);
        Instant to = Instant.now();

        //Create campaign, publisher and add publisher to campaign
        createNecessityEntitiesWhichAreConstant();

        //Create result array
        CounterMap<ResultSet> resultSetCounterMap = new CounterMap<>(ResultSet.class);

        //Expected empty result -- resultSetCounterMap is empty
        Assert.assertTrue(resultSetCounterMap.isEmpty());

        //Start doing and check result
        createRandomEvent(from, to);
        restMockMvc.perform(get("/api/optimization-job/run"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().json(resultSetCounterMap.toJson()));
    }

    /**
     * Test run when we remove the publisher from blacklist because
     * conditions one is true (sourceEvents less then threshold)
     * conditions two is false (measureEvents less then ratioThreshold percent of sourceEvent)
     */
    @Test
    @Transactional
    public void testRunRemoveFromBlackListByConditionOne() throws Exception {
        //Describe test data
        eventCounter.put(EventType.SOURCE_EVENT, 1L); //less then 2L which we describe when created optimizationsProp entity

        Instant from = Instant.now().minusSeconds(WORKABLE_RANGE);
        Instant to = Instant.now();


        //Create campaign, publisher and add publisher to campaign
        createNecessityEntitiesWhichAreConstant();

        //Create result array
        CounterMap<ResultSet> resultSetCounterMap = new CounterMap<>(ResultSet.class);

        //Add publisher to BlackList
        addPublisherToBlackList();

        //Expected content
        resultSetCounterMap.put(ResultSet.REMOVED, 1L);

        //Start doing and check result
        createRandomEvent(from, to);
        restMockMvc.perform(get("/api/optimization-job/run"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().json(resultSetCounterMap.toJson()));
    }

    /**
     * Test run when we add the publisher to blacklist because
     * conditions one is false (sourceEvents more then threshold)
     * conditions two is false (measureEvents less then ratioThreshold percent of sourceEvent)
     */
    @Test
    @Transactional
    public void testRunAddToBlackListByConditionOneWhenItIsFalse() throws Exception {
        //Describe test data
        eventCounter.put(EventType.SOURCE_EVENT, 3L); //more then 2L which we describe when created optimizationsProp entity

        Instant from = Instant.now().minusSeconds(WORKABLE_RANGE);
        Instant to = Instant.now();

        //Create campaign, publisher and add publisher to campaign
        createNecessityEntitiesWhichAreConstant();

        //Create result array
        CounterMap<ResultSet> resultSetCounterMap = new CounterMap<>(ResultSet.class);

        //Expected content
        resultSetCounterMap.put(ResultSet.ADDED, 1L);

        //Start doing and check result
        createRandomEvent(from, to);
        restMockMvc.perform(get("/api/optimization-job/run"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().json(resultSetCounterMap.toJson()));
    }

    /**
     * Test run  when we not remove the publisher from blacklist because
     * conditions one is false (sourceEvents more then threshold)
     * conditions two is false (measureEvents less then ratioThreshold percent of sourceEvent)
     */
    @Test
    @Transactional
    public void testRunNotRemoveFromBlackListByConditionOneWhenItIsTrue() throws Exception {
        //Describe test data
        eventCounter.put(EventType.SOURCE_EVENT, 3L);//more then 2L which we describe when created optimizationsProp entity

        Instant from = Instant.now().minusSeconds(WORKABLE_RANGE);
        Instant to = Instant.now();

        //Create campaign, publisher and add publisher to campaign
        createNecessityEntitiesWhichAreConstant();

        //Create result array
        CounterMap<ResultSet> resultSetCounterMap = new CounterMap<>(ResultSet.class);

        //Add publisher to BlackList
        addPublisherToBlackList();

        //Expected empty result -- resultSetCounterMap is empty
        Assert.assertTrue(resultSetCounterMap.isEmpty());

        //Start doing and check result
        createRandomEvent(from, to);
        restMockMvc.perform(get("/api/optimization-job/run"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().json(resultSetCounterMap.toJson()));
    }

    /**
     * Test run  when we add the publisher to blacklist because
     * conditions one is false (sourceEvents more then threshold)
     * conditions two is false (measureEvents less then ratioThreshold percent of sourceEvent)
     */
    @Test
    @Transactional
    public void testRunAddToBlackListByConditionTwoWhenItIsFalse() throws Exception {
        //Describe test data
        eventCounter.put(EventType.SOURCE_EVENT, 10L);
        eventCounter.put(EventType.MEASURED_EVENT, 1L);

        Instant from = Instant.now().minusSeconds(WORKABLE_RANGE);
        Instant to = Instant.now();

        //Create campaign, publisher and add publisher to campaign
        createNecessityEntitiesWhichAreConstant();

        //Create result array
        CounterMap<ResultSet> resultSetCounterMap = new CounterMap<>(ResultSet.class);

        //Expected content
        resultSetCounterMap.put(ResultSet.ADDED, 1L);

        //Start doing and check result
        createRandomEvent(from, to);
        restMockMvc.perform(get("/api/optimization-job/run"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().json(resultSetCounterMap.toJson()));
    }

    /**
     * Test run when we not remove the publisher from blacklist because
     * conditions one is false (sourceEvents more then threshold)
     * conditions two is false (measureEvents less then ratioThreshold percent of sourceEvent)
     */
    @Test
    @Transactional
    public void testRunNotRemoveFromBlackListByConditionTwoWhenItIsFalse() throws Exception {
        //Describe test data
        eventCounter.put(EventType.SOURCE_EVENT, 10L);
        eventCounter.put(EventType.MEASURED_EVENT, 1L);

        Instant from = Instant.now().minusSeconds(WORKABLE_RANGE);
        Instant to = Instant.now();

        //Create campaign, publisher and add publisher to campaign
        createNecessityEntitiesWhichAreConstant();

        //Create result array
        CounterMap<ResultSet> resultSetCounterMap = new CounterMap<>(ResultSet.class);

        //Add publisher to BlackList
        addPublisherToBlackList();

        //Expected empty result -- resultSetCounterMap is empty
        Assert.assertTrue(resultSetCounterMap.isEmpty());

        //Start doing and check result
        createRandomEvent(from, to);
        restMockMvc.perform(get("/api/optimization-job/run"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().json(resultSetCounterMap.toJson()));
    }

    /**
     * Test run when we not add the publisher to blacklist because
     * conditions one is false (sourceEvents more then threshold)
     * conditions two is true (measureEvents equal or greater then ratioThreshold percent of sourceEvent)
     */
    @Test
    @Transactional
    public void testRunNotAddToBlackListByConditionTwoWhenItIsTrue() throws Exception {
        //Describe test data
        eventCounter.put(EventType.SOURCE_EVENT, 10L);
        eventCounter.put(EventType.MEASURED_EVENT, 3L);

        Instant from = Instant.now().minusSeconds(WORKABLE_RANGE);
        Instant to = Instant.now();

        //Create campaign, publisher and add publisher to campaign
        createNecessityEntitiesWhichAreConstant();

        //Create result array
        CounterMap<ResultSet> resultSetCounterMap = new CounterMap<>(ResultSet.class);

        //Expected empty result -- resultSetCounterMap is empty
        Assert.assertTrue(resultSetCounterMap.isEmpty());

        //Start doing and check result
        createRandomEvent(from, to);
        restMockMvc.perform(get("/api/optimization-job/run"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().json(resultSetCounterMap.toJson()));
    }

    /**
     * Test run when we remove the publisher from blacklist because
     * conditions one is false (sourceEvents more then threshold)
     * conditions two is true (measureEvents equal or greater then ratioThreshold percent of sourceEvent)
     */
    @Test
    @Transactional
    public void testRunRemoveFromBlackListByConditionTwoWhenItIsTrue() throws Exception {
        //Describe test data
        eventCounter.put(EventType.SOURCE_EVENT, 10L);
        eventCounter.put(EventType.MEASURED_EVENT, 3L);

        Instant from = Instant.now().minusSeconds(WORKABLE_RANGE);
        Instant to = Instant.now();

        //Create campaign, publisher and add publisher to campaign
        createNecessityEntitiesWhichAreConstant();

        //Create result array
        CounterMap<ResultSet> resultSetCounterMap = new CounterMap<>(ResultSet.class);

        //Add publisher to BlackList
        addPublisherToBlackList();

        //Expected content
        resultSetCounterMap.put(ResultSet.REMOVED, 1L);

        //Start doing and check result
        createRandomEvent(from, to);
        restMockMvc.perform(get("/api/optimization-job/run"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().json(resultSetCounterMap.toJson()));
    }

    /**
     * Test run when we remove the publisher from blacklist because
     * conditions one is true (sourceEvents less then threshold)
     * conditions two is true (measureEvents equal or greater then ratioThreshold percent of sourceEvent)
     */
    @Test
    @Transactional
    public void testRunRemoveFromBlackListByConditionOneAndTwoIsTrue() throws Exception {
        //Describe test data
        eventCounter.put(EventType.SOURCE_EVENT, 1L);
        eventCounter.put(EventType.MEASURED_EVENT, 3L);

        Instant from = Instant.now().minusSeconds(WORKABLE_RANGE);
        Instant to = Instant.now();

        //Create campaign, publisher and add publisher to campaign
        createNecessityEntitiesWhichAreConstant();

        //Create result array
        CounterMap<ResultSet> resultSetCounterMap = new CounterMap<>(ResultSet.class);

        //Add publisher to BlackList
        addPublisherToBlackList();

        //Expected content
        resultSetCounterMap.put(ResultSet.REMOVED, 1L);

        //Start doing and check result
        createRandomEvent(from, to);
        restMockMvc.perform(get("/api/optimization-job/run"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().json(resultSetCounterMap.toJson()));
    }


    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Event createEntityEvent(EntityManager em, String type, Instant time_created) {
        Event event = new Event()
            .type(type)
            .created(time_created);
        return event;
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Campaign createEntityCampaign(EntityManager em) {
        Campaign campaign = new Campaign()
            .name(DEFAULT_NAME);
        return campaign;
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Publisher createEntityPublisher(EntityManager em) {
        Publisher publisher = new Publisher()
            .name(DEFAULT_NAME);
        return publisher;
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OptimizationProps createEntityOptimizationProps(EntityManager em) {
        OptimizationProps optimizationProps = new OptimizationProps()
            .threshold(DEFAULT_THRESHOLD)
            .sourceEvent(DEFAULT_SOURCE_EVENT)
            .ratioThreshold(DEFAULT_RATIO_THRESHOLD)
            .measuredEvent(DEFAULT_MEASURED_EVENT);
        return optimizationProps;
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BlackList createEntityBlackList(EntityManager em) {
        BlackList blackList = new BlackList();
        return blackList;
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CampaignRecord createEntityCampaignRecord(EntityManager em) {
        CampaignRecord campaignRecord = new CampaignRecord();
        return campaignRecord;
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BlackListRecord createEntityBlackListRecord(EntityManager em) {
        BlackListRecord blackListRecord = new BlackListRecord();
        return blackListRecord;
    }

    /**
     * Create Events with desired param when eventCounter decide how many each event's type should be...
     *
     * @param from
     * @param to
     */
    private void createRandomEvent(Instant from, Instant to){
        OptimizationProps optimizationProps = campaign.getOptimizationProps();
        List<Event> eventList = new ArrayList<>();

        System.out.print("-->");
        eventCounter.keySet().forEach(key -> {
            Long counter = eventCounter.get(key);
            String type =
                (key.equals(EventType.SOURCE_EVENT)) ? optimizationProps.getSourceEvent() : optimizationProps.getMeasuredEvent();
            while(counter > 0){
                Event event = createEntityEvent(em, type, randomTimeFromRange(from, to));
                event
                    .campaign(campaign)
                    .publisher(publisher);
                eventList.add(event);
                --counter;
            }
        });
        System.out.print(eventList);
        eventRepository.save(eventList);
    }

    /**
     * Create full complied Campaign with Campaign Records and BlackList
     * with some optimized props
     *
     * @param optimizationProps
     * @return campaign which is ready to use in this test
     */
    private Campaign createCampaign(OptimizationProps optimizationProps){
        Campaign campaign = createEntityCampaign(em);
        BlackList blackList = createEntityBlackList(em);
        blackListRepository.save(blackList);
        campaign
            .optimizationProps(optimizationProps)
            .blacklist(blackList);
        campaignRepository.save(campaign);
        return campaign;
    }

    /**
     * Add the publisher to the campaign
     *
     */
    private void addPublisherToCampaign(){
        CampaignRecord campaignRecord = createEntityCampaignRecord(em);
        campaignRecord
            .campaign(campaign)
            .publisher(publisher);
        campaignRecordRepository.save(campaignRecord);
    }

    /**
     * Add the publisher to the campaign's blacklist
     */
    private void addPublisherToBlackList() {
        BlackListRecord blackListRecord = createEntityBlackListRecord(em);
        blackListRecord
            .blackList(campaign.getBlacklist())
            .publisher(publisher);
        blackListRecordRepository.save(blackListRecord);
    }

    /**
     * Create random tim from desired range
     *
     * @param from from range Time
     * @param to to range Time
     * @return random time in Instant type
     */
    private Instant randomTimeFromRange(Instant from, Instant to){
        Long newTime = ThreadLocalRandom.current().nextLong((to.getEpochSecond() - from.getEpochSecond()));
        return from.plusSeconds(newTime);
    }
}
