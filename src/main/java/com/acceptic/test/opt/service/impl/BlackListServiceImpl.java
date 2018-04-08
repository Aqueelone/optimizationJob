package com.acceptic.test.opt.service.impl;

import com.acceptic.test.opt.service.BlackListService;
import com.acceptic.test.opt.domain.BlackList;
import com.acceptic.test.opt.repository.BlackListRepository;
import com.acceptic.test.opt.service.dto.BlackListDTO;
import com.acceptic.test.opt.service.mapper.BlackListMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing BlackList.
 */
@Service
@Transactional
public class BlackListServiceImpl implements BlackListService {

    private final Logger log = LoggerFactory.getLogger(BlackListServiceImpl.class);

    private final BlackListRepository blackListRepository;

    private final BlackListMapper blackListMapper;

    public BlackListServiceImpl(BlackListRepository blackListRepository, BlackListMapper blackListMapper) {
        this.blackListRepository = blackListRepository;
        this.blackListMapper = blackListMapper;
    }

    /**
     * Save a blackList.
     *
     * @param blackListDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BlackListDTO save(BlackListDTO blackListDTO) {
        log.debug("Request to save BlackList : {}", blackListDTO);
        BlackList blackList = blackListMapper.toEntity(blackListDTO);
        blackList = blackListRepository.save(blackList);
        return blackListMapper.toDto(blackList);
    }

    /**
     * Get all the blackLists.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BlackListDTO> findAll(Pageable pageable) {
        log.debug("Request to get all BlackLists");
        return blackListRepository.findAll(pageable)
            .map(blackListMapper::toDto);
    }

    /**
     * Get one blackList by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public BlackListDTO findOne(Long id) {
        log.debug("Request to get BlackList : {}", id);
        BlackList blackList = blackListRepository.findOne(id);
        return blackListMapper.toDto(blackList);
    }

    /**
     * Delete the blackList by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BlackList : {}", id);
        blackListRepository.delete(id);
    }
}
