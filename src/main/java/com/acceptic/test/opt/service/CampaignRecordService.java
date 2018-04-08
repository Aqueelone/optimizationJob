package com.acceptic.test.opt.service;

import com.acceptic.test.opt.service.dto.CampaignRecordDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing CampaignRecord.
 */
public interface CampaignRecordService {

    /**
     * Save a campaignRecord.
     *
     * @param campaignRecordDTO the entity to save
     * @return the persisted entity
     */
    CampaignRecordDTO save(CampaignRecordDTO campaignRecordDTO);

    /**
     * Get all the campaignRecords.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CampaignRecordDTO> findAll(Pageable pageable);

    /**
     * Get the "id" campaignRecord.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CampaignRecordDTO findOne(Long id);

    /**
     * Delete the "id" campaignRecord.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
