package com.acceptic.test.opt.service.mapper;

import com.acceptic.test.opt.domain.*;
import com.acceptic.test.opt.service.dto.BlackListDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BlackList and its DTO BlackListDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BlackListMapper extends EntityMapper<BlackListDTO, BlackList> {


    @Mapping(target = "blacklistRecords", ignore = true)
    BlackList toEntity(BlackListDTO blackListDTO);

    default BlackList fromId(Long id) {
        if (id == null) {
            return null;
        }
        BlackList blackList = new BlackList();
        blackList.setId(id);
        return blackList;
    }
}
