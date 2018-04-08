package com.acceptic.test.opt.service.mapper;

import com.acceptic.test.opt.domain.*;
import com.acceptic.test.opt.service.dto.EventDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Event and its DTO EventDTO.
 */
@Mapper(componentModel = "spring", uses = {PublisherMapper.class, CampaignMapper.class})
public interface EventMapper extends EntityMapper<EventDTO, Event> {

    @Mapping(source = "publisher.id", target = "publisherId")
    @Mapping(source = "campaign.id", target = "campaignId")
    EventDTO toDto(Event event);

    @Mapping(source = "publisherId", target = "publisher")
    @Mapping(source = "campaignId", target = "campaign")
    Event toEntity(EventDTO eventDTO);

    default Event fromId(Long id) {
        if (id == null) {
            return null;
        }
        Event event = new Event();
        event.setId(id);
        return event;
    }
}
