package com.acceptic.test.opt.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.acceptic.test.opt.service.BlackListRecordService;
import com.acceptic.test.opt.web.rest.errors.BadRequestAlertException;
import com.acceptic.test.opt.web.rest.util.HeaderUtil;
import com.acceptic.test.opt.web.rest.util.PaginationUtil;
import com.acceptic.test.opt.service.dto.BlackListRecordDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing BlackListRecord.
 */
@RestController
@RequestMapping("/api")
public class BlackListRecordResource {

    private final Logger log = LoggerFactory.getLogger(BlackListRecordResource.class);

    private static final String ENTITY_NAME = "blackListRecord";

    private final BlackListRecordService blackListRecordService;

    public BlackListRecordResource(BlackListRecordService blackListRecordService) {
        this.blackListRecordService = blackListRecordService;
    }

    /**
     * POST  /black-list-records : Create a new blackListRecord.
     *
     * @param blackListRecordDTO the blackListRecordDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new blackListRecordDTO, or with status 400 (Bad Request) if the blackListRecord has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/black-list-records")
    @Timed
    public ResponseEntity<BlackListRecordDTO> createBlackListRecord(@RequestBody BlackListRecordDTO blackListRecordDTO) throws URISyntaxException {
        log.debug("REST request to save BlackListRecord : {}", blackListRecordDTO);
        if (blackListRecordDTO.getId() != null) {
            throw new BadRequestAlertException("A new blackListRecord cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BlackListRecordDTO result = blackListRecordService.save(blackListRecordDTO);
        return ResponseEntity.created(new URI("/api/black-list-records/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /black-list-records : Updates an existing blackListRecord.
     *
     * @param blackListRecordDTO the blackListRecordDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated blackListRecordDTO,
     * or with status 400 (Bad Request) if the blackListRecordDTO is not valid,
     * or with status 500 (Internal Server Error) if the blackListRecordDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/black-list-records")
    @Timed
    public ResponseEntity<BlackListRecordDTO> updateBlackListRecord(@RequestBody BlackListRecordDTO blackListRecordDTO) throws URISyntaxException {
        log.debug("REST request to update BlackListRecord : {}", blackListRecordDTO);
        if (blackListRecordDTO.getId() == null) {
            return createBlackListRecord(blackListRecordDTO);
        }
        BlackListRecordDTO result = blackListRecordService.save(blackListRecordDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, blackListRecordDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /black-list-records : get all the blackListRecords.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of blackListRecords in body
     */
    @GetMapping("/black-list-records")
    @Timed
    public ResponseEntity<List<BlackListRecordDTO>> getAllBlackListRecords(Pageable pageable) {
        log.debug("REST request to get a page of BlackListRecords");
        Page<BlackListRecordDTO> page = blackListRecordService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/black-list-records");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /black-list-records/:id : get the "id" blackListRecord.
     *
     * @param id the id of the blackListRecordDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the blackListRecordDTO, or with status 404 (Not Found)
     */
    @GetMapping("/black-list-records/{id}")
    @Timed
    public ResponseEntity<BlackListRecordDTO> getBlackListRecord(@PathVariable Long id) {
        log.debug("REST request to get BlackListRecord : {}", id);
        BlackListRecordDTO blackListRecordDTO = blackListRecordService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(blackListRecordDTO));
    }

    /**
     * DELETE  /black-list-records/:id : delete the "id" blackListRecord.
     *
     * @param id the id of the blackListRecordDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/black-list-records/{id}")
    @Timed
    public ResponseEntity<Void> deleteBlackListRecord(@PathVariable Long id) {
        log.debug("REST request to delete BlackListRecord : {}", id);
        blackListRecordService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
