package com.acceptic.test.opt.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.acceptic.test.opt.service.OptimizationPropsService;
import com.acceptic.test.opt.web.rest.errors.BadRequestAlertException;
import com.acceptic.test.opt.web.rest.util.HeaderUtil;
import com.acceptic.test.opt.web.rest.util.PaginationUtil;
import com.acceptic.test.opt.service.dto.OptimizationPropsDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing OptimizationProps.
 */
@RestController
@RequestMapping("/api")
public class OptimizationPropsResource {

    private final Logger log = LoggerFactory.getLogger(OptimizationPropsResource.class);

    private static final String ENTITY_NAME = "optimizationProps";

    private final OptimizationPropsService optimizationPropsService;

    public OptimizationPropsResource(OptimizationPropsService optimizationPropsService) {
        this.optimizationPropsService = optimizationPropsService;
    }

    /**
     * POST  /optimization-props : Create a new optimizationProps.
     *
     * @param optimizationPropsDTO the optimizationPropsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new optimizationPropsDTO, or with status 400 (Bad Request) if the optimizationProps has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/optimization-props")
    @Timed
    public ResponseEntity<OptimizationPropsDTO> createOptimizationProps(@Valid @RequestBody OptimizationPropsDTO optimizationPropsDTO) throws URISyntaxException {
        log.debug("REST request to save OptimizationProps : {}", optimizationPropsDTO);
        if (optimizationPropsDTO.getId() != null) {
            throw new BadRequestAlertException("A new optimizationProps cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OptimizationPropsDTO result = optimizationPropsService.save(optimizationPropsDTO);
        return ResponseEntity.created(new URI("/api/optimization-props/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /optimization-props : Updates an existing optimizationProps.
     *
     * @param optimizationPropsDTO the optimizationPropsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated optimizationPropsDTO,
     * or with status 400 (Bad Request) if the optimizationPropsDTO is not valid,
     * or with status 500 (Internal Server Error) if the optimizationPropsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/optimization-props")
    @Timed
    public ResponseEntity<OptimizationPropsDTO> updateOptimizationProps(@Valid @RequestBody OptimizationPropsDTO optimizationPropsDTO) throws URISyntaxException {
        log.debug("REST request to update OptimizationProps : {}", optimizationPropsDTO);
        if (optimizationPropsDTO.getId() == null) {
            return createOptimizationProps(optimizationPropsDTO);
        }
        OptimizationPropsDTO result = optimizationPropsService.save(optimizationPropsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, optimizationPropsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /optimization-props : get all the optimizationProps.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of optimizationProps in body
     */
    @GetMapping("/optimization-props")
    @Timed
    public ResponseEntity<List<OptimizationPropsDTO>> getAllOptimizationProps(Pageable pageable) {
        log.debug("REST request to get a page of OptimizationProps");
        Page<OptimizationPropsDTO> page = optimizationPropsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/optimization-props");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /optimization-props/:id : get the "id" optimizationProps.
     *
     * @param id the id of the optimizationPropsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the optimizationPropsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/optimization-props/{id}")
    @Timed
    public ResponseEntity<OptimizationPropsDTO> getOptimizationProps(@PathVariable Long id) {
        log.debug("REST request to get OptimizationProps : {}", id);
        OptimizationPropsDTO optimizationPropsDTO = optimizationPropsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(optimizationPropsDTO));
    }

    /**
     * DELETE  /optimization-props/:id : delete the "id" optimizationProps.
     *
     * @param id the id of the optimizationPropsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/optimization-props/{id}")
    @Timed
    public ResponseEntity<Void> deleteOptimizationProps(@PathVariable Long id) {
        log.debug("REST request to delete OptimizationProps : {}", id);
        optimizationPropsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
