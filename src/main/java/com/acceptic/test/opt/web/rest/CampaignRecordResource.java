package com.acceptic.test.opt.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.acceptic.test.opt.service.CampaignRecordService;
import com.acceptic.test.opt.web.rest.errors.BadRequestAlertException;
import com.acceptic.test.opt.web.rest.util.HeaderUtil;
import com.acceptic.test.opt.web.rest.util.PaginationUtil;
import com.acceptic.test.opt.service.dto.CampaignRecordDTO;
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
 * REST controller for managing CampaignRecord.
 */
@RestController
@RequestMapping("/api")
public class CampaignRecordResource {

    private final Logger log = LoggerFactory.getLogger(CampaignRecordResource.class);

    private static final String ENTITY_NAME = "campaignRecord";

    private final CampaignRecordService campaignRecordService;

    public CampaignRecordResource(CampaignRecordService campaignRecordService) {
        this.campaignRecordService = campaignRecordService;
    }

    /**
     * POST  /campaign-records : Create a new campaignRecord.
     *
     * @param campaignRecordDTO the campaignRecordDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new campaignRecordDTO, or with status 400 (Bad Request) if the campaignRecord has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/campaign-records")
    @Timed
    public ResponseEntity<CampaignRecordDTO> createCampaignRecord(@RequestBody CampaignRecordDTO campaignRecordDTO) throws URISyntaxException {
        log.debug("REST request to save CampaignRecord : {}", campaignRecordDTO);
        if (campaignRecordDTO.getId() != null) {
            throw new BadRequestAlertException("A new campaignRecord cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CampaignRecordDTO result = campaignRecordService.save(campaignRecordDTO);
        return ResponseEntity.created(new URI("/api/campaign-records/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /campaign-records : Updates an existing campaignRecord.
     *
     * @param campaignRecordDTO the campaignRecordDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated campaignRecordDTO,
     * or with status 400 (Bad Request) if the campaignRecordDTO is not valid,
     * or with status 500 (Internal Server Error) if the campaignRecordDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/campaign-records")
    @Timed
    public ResponseEntity<CampaignRecordDTO> updateCampaignRecord(@RequestBody CampaignRecordDTO campaignRecordDTO) throws URISyntaxException {
        log.debug("REST request to update CampaignRecord : {}", campaignRecordDTO);
        if (campaignRecordDTO.getId() == null) {
            return createCampaignRecord(campaignRecordDTO);
        }
        CampaignRecordDTO result = campaignRecordService.save(campaignRecordDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, campaignRecordDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /campaign-records : get all the campaignRecords.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of campaignRecords in body
     */
    @GetMapping("/campaign-records")
    @Timed
    public ResponseEntity<List<CampaignRecordDTO>> getAllCampaignRecords(Pageable pageable) {
        log.debug("REST request to get a page of CampaignRecords");
        Page<CampaignRecordDTO> page = campaignRecordService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/campaign-records");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /campaign-records/:id : get the "id" campaignRecord.
     *
     * @param id the id of the campaignRecordDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the campaignRecordDTO, or with status 404 (Not Found)
     */
    @GetMapping("/campaign-records/{id}")
    @Timed
    public ResponseEntity<CampaignRecordDTO> getCampaignRecord(@PathVariable Long id) {
        log.debug("REST request to get CampaignRecord : {}", id);
        CampaignRecordDTO campaignRecordDTO = campaignRecordService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(campaignRecordDTO));
    }

    /**
     * DELETE  /campaign-records/:id : delete the "id" campaignRecord.
     *
     * @param id the id of the campaignRecordDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/campaign-records/{id}")
    @Timed
    public ResponseEntity<Void> deleteCampaignRecord(@PathVariable Long id) {
        log.debug("REST request to delete CampaignRecord : {}", id);
        campaignRecordService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
