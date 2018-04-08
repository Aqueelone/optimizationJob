package com.acceptic.test.opt.service.mapper;

import com.acceptic.test.opt.domain.*;
import com.acceptic.test.opt.service.dto.PublisherDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Publisher and its DTO PublisherDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PublisherMapper extends EntityMapper<PublisherDTO, Publisher> {


    @Mapping(target = "events", ignore = true)
    @Mapping(target = "campaignRecords", ignore = true)
    @Mapping(target = "blacklistRecords", ignore = true)
    Publisher toEntity(PublisherDTO publisherDTO);

    default Publisher fromId(Long id) {
        if (id == null) {
            return null;
        }
        Publisher publisher = new Publisher();
        publisher.setId(id);
        return publisher;
    }
}
