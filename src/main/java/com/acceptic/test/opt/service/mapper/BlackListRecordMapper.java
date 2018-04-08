package com.acceptic.test.opt.service.mapper;

import com.acceptic.test.opt.domain.*;
import com.acceptic.test.opt.service.dto.BlackListRecordDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BlackListRecord and its DTO BlackListRecordDTO.
 */
@Mapper(componentModel = "spring", uses = {PublisherMapper.class, BlackListMapper.class})
public interface BlackListRecordMapper extends EntityMapper<BlackListRecordDTO, BlackListRecord> {

    @Mapping(source = "publisher.id", target = "publisherId")
    @Mapping(source = "blackList.id", target = "blackListId")
    BlackListRecordDTO toDto(BlackListRecord blackListRecord);

    @Mapping(source = "publisherId", target = "publisher")
    @Mapping(source = "blackListId", target = "blackList")
    BlackListRecord toEntity(BlackListRecordDTO blackListRecordDTO);

    default BlackListRecord fromId(Long id) {
        if (id == null) {
            return null;
        }
        BlackListRecord blackListRecord = new BlackListRecord();
        blackListRecord.setId(id);
        return blackListRecord;
    }
}
