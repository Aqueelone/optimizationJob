package com.acceptic.test.opt.service;

import com.acceptic.test.opt.service.dto.OptimizationPropsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing OptimizationProps.
 */
public interface OptimizationPropsService {

    /**
     * Save a optimizationProps.
     *
     * @param optimizationPropsDTO the entity to save
     * @return the persisted entity
     */
    OptimizationPropsDTO save(OptimizationPropsDTO optimizationPropsDTO);

    /**
     * Get all the optimizationProps.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<OptimizationPropsDTO> findAll(Pageable pageable);

    /**
     * Get the "id" optimizationProps.
     *
     * @param id the id of the entity
     * @return the entity
     */
    OptimizationPropsDTO findOne(Long id);

    /**
     * Delete the "id" optimizationProps.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
