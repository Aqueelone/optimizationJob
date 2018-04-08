package com.acceptic.test.opt.service;

import com.acceptic.test.opt.service.dto.BlackListRecordDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing BlackListRecord.
 */
public interface BlackListRecordService {

    /**
     * Save a blackListRecord.
     *
     * @param blackListRecordDTO the entity to save
     * @return the persisted entity
     */
    BlackListRecordDTO save(BlackListRecordDTO blackListRecordDTO);

    /**
     * Get all the blackListRecords.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<BlackListRecordDTO> findAll(Pageable pageable);

    /**
     * Get the "id" blackListRecord.
     *
     * @param id the id of the entity
     * @return the entity
     */
    BlackListRecordDTO findOne(Long id);

    /**
     * Delete the "id" blackListRecord.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
