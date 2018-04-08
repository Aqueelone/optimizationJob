package com.acceptic.test.opt.service.impl;

import com.acceptic.test.opt.service.BlackListRecordService;
import com.acceptic.test.opt.domain.BlackListRecord;
import com.acceptic.test.opt.repository.BlackListRecordRepository;
import com.acceptic.test.opt.service.dto.BlackListRecordDTO;
import com.acceptic.test.opt.service.mapper.BlackListRecordMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing BlackListRecord.
 */
@Service
@Transactional
public class BlackListRecordServiceImpl implements BlackListRecordService {

    private final Logger log = LoggerFactory.getLogger(BlackListRecordServiceImpl.class);

    private final BlackListRecordRepository blackListRecordRepository;

    private final BlackListRecordMapper blackListRecordMapper;

    public BlackListRecordServiceImpl(BlackListRecordRepository blackListRecordRepository, BlackListRecordMapper blackListRecordMapper) {
        this.blackListRecordRepository = blackListRecordRepository;
        this.blackListRecordMapper = blackListRecordMapper;
    }

    /**
     * Save a blackListRecord.
     *
     * @param blackListRecordDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BlackListRecordDTO save(BlackListRecordDTO blackListRecordDTO) {
        log.debug("Request to save BlackListRecord : {}", blackListRecordDTO);
        BlackListRecord blackListRecord = blackListRecordMapper.toEntity(blackListRecordDTO);
        blackListRecord = blackListRecordRepository.save(blackListRecord);
        return blackListRecordMapper.toDto(blackListRecord);
    }

    /**
     * Get all the blackListRecords.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BlackListRecordDTO> findAll(Pageable pageable) {
        log.debug("Request to get all BlackListRecords");
        return blackListRecordRepository.findAll(pageable)
            .map(blackListRecordMapper::toDto);
    }

    /**
     * Get one blackListRecord by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public BlackListRecordDTO findOne(Long id) {
        log.debug("Request to get BlackListRecord : {}", id);
        BlackListRecord blackListRecord = blackListRecordRepository.findOne(id);
        return blackListRecordMapper.toDto(blackListRecord);
    }

    /**
     * Delete the blackListRecord by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BlackListRecord : {}", id);
        blackListRecordRepository.delete(id);
    }
}
