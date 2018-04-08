package com.acceptic.test.opt.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.acceptic.test.opt.service.BlackListService;
import com.acceptic.test.opt.web.rest.errors.BadRequestAlertException;
import com.acceptic.test.opt.web.rest.util.HeaderUtil;
import com.acceptic.test.opt.web.rest.util.PaginationUtil;
import com.acceptic.test.opt.service.dto.BlackListDTO;
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
 * REST controller for managing BlackList.
 */
@RestController
@RequestMapping("/api")
public class BlackListResource {

    private final Logger log = LoggerFactory.getLogger(BlackListResource.class);

    private static final String ENTITY_NAME = "blackList";

    private final BlackListService blackListService;

    public BlackListResource(BlackListService blackListService) {
        this.blackListService = blackListService;
    }

    /**
     * POST  /black-lists : Create a new blackList.
     *
     * @param blackListDTO the blackListDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new blackListDTO, or with status 400 (Bad Request) if the blackList has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/black-lists")
    @Timed
    public ResponseEntity<BlackListDTO> createBlackList(@RequestBody BlackListDTO blackListDTO) throws URISyntaxException {
        log.debug("REST request to save BlackList : {}", blackListDTO);
        if (blackListDTO.getId() != null) {
            throw new BadRequestAlertException("A new blackList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BlackListDTO result = blackListService.save(blackListDTO);
        return ResponseEntity.created(new URI("/api/black-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /black-lists : Updates an existing blackList.
     *
     * @param blackListDTO the blackListDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated blackListDTO,
     * or with status 400 (Bad Request) if the blackListDTO is not valid,
     * or with status 500 (Internal Server Error) if the blackListDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/black-lists")
    @Timed
    public ResponseEntity<BlackListDTO> updateBlackList(@RequestBody BlackListDTO blackListDTO) throws URISyntaxException {
        log.debug("REST request to update BlackList : {}", blackListDTO);
        if (blackListDTO.getId() == null) {
            return createBlackList(blackListDTO);
        }
        BlackListDTO result = blackListService.save(blackListDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, blackListDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /black-lists : get all the blackLists.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of blackLists in body
     */
    @GetMapping("/black-lists")
    @Timed
    public ResponseEntity<List<BlackListDTO>> getAllBlackLists(Pageable pageable) {
        log.debug("REST request to get a page of BlackLists");
        Page<BlackListDTO> page = blackListService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/black-lists");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /black-lists/:id : get the "id" blackList.
     *
     * @param id the id of the blackListDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the blackListDTO, or with status 404 (Not Found)
     */
    @GetMapping("/black-lists/{id}")
    @Timed
    public ResponseEntity<BlackListDTO> getBlackList(@PathVariable Long id) {
        log.debug("REST request to get BlackList : {}", id);
        BlackListDTO blackListDTO = blackListService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(blackListDTO));
    }

    /**
     * DELETE  /black-lists/:id : delete the "id" blackList.
     *
     * @param id the id of the blackListDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/black-lists/{id}")
    @Timed
    public ResponseEntity<Void> deleteBlackList(@PathVariable Long id) {
        log.debug("REST request to delete BlackList : {}", id);
        blackListService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
