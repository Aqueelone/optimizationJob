package com.acceptic.test.opt.service.mapper;

import com.acceptic.test.opt.domain.*;
import com.acceptic.test.opt.service.dto.OptimizationPropsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OptimizationProps and its DTO OptimizationPropsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface OptimizationPropsMapper extends EntityMapper<OptimizationPropsDTO, OptimizationProps> {



    default OptimizationProps fromId(Long id) {
        if (id == null) {
            return null;
        }
        OptimizationProps optimizationProps = new OptimizationProps();
        optimizationProps.setId(id);
        return optimizationProps;
    }
}
