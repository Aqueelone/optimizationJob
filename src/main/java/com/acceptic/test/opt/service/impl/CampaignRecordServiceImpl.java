package com.acceptic.test.opt.service.impl;

import com.acceptic.test.opt.service.CampaignRecordService;
import com.acceptic.test.opt.domain.CampaignRecord;
import com.acceptic.test.opt.repository.CampaignRecordRepository;
import com.acceptic.test.opt.service.dto.CampaignRecordDTO;
import com.acceptic.test.opt.service.mapper.CampaignRecordMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing CampaignRecord.
 */
@Service
@Transactional
public class CampaignRecordServiceImpl implements CampaignRecordService {

    private final Logger log = LoggerFactory.getLogger(CampaignRecordServiceImpl.class);

    private final CampaignRecordRepository campaignRecordRepository;

    private final CampaignRecordMapper campaignRecordMapper;

    public CampaignRecordServiceImpl(CampaignRecordRepository campaignRecordRepository, CampaignRecordMapper campaignRecordMapper) {
        this.campaignRecordRepository = campaignRecordRepository;
        this.campaignRecordMapper = campaignRecordMapper;
    }

    /**
     * Save a campaignRecord.
     *
     * @param campaignRecordDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CampaignRecordDTO save(CampaignRecordDTO campaignRecordDTO) {
        log.debug("Request to save CampaignRecord : {}", campaignRecordDTO);
        CampaignRecord campaignRecord = campaignRecordMapper.toEntity(campaignRecordDTO);
        campaignRecord = campaignRecordRepository.save(campaignRecord);
        return campaignRecordMapper.toDto(campaignRecord);
    }

    /**
     * Get all the campaignRecords.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CampaignRecordDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CampaignRecords");
        return campaignRecordRepository.findAll(pageable)
            .map(campaignRecordMapper::toDto);
    }

    /**
     * Get one campaignRecord by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CampaignRecordDTO findOne(Long id) {
        log.debug("Request to get CampaignRecord : {}", id);
        CampaignRecord campaignRecord = campaignRecordRepository.findOne(id);
        return campaignRecordMapper.toDto(campaignRecord);
    }

    /**
     * Delete the campaignRecord by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CampaignRecord : {}", id);
        campaignRecordRepository.delete(id);
    }
}
