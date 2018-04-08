package com.acceptic.test.opt.service;

import com.acceptic.test.opt.service.dto.PublisherDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Publisher.
 */
public interface PublisherService {

    /**
     * Save a publisher.
     *
     * @param publisherDTO the entity to save
     * @return the persisted entity
     */
    PublisherDTO save(PublisherDTO publisherDTO);

    /**
     * Get all the publishers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<PublisherDTO> findAll(Pageable pageable);

    /**
     * Get the "id" publisher.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PublisherDTO findOne(Long id);

    /**
     * Delete the "id" publisher.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
