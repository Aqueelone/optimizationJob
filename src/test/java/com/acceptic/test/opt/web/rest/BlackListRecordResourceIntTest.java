package com.acceptic.test.opt.web.rest;

import com.acceptic.test.opt.OptimizationJobApp;

import com.acceptic.test.opt.domain.BlackListRecord;
import com.acceptic.test.opt.repository.BlackListRecordRepository;
import com.acceptic.test.opt.service.BlackListRecordService;
import com.acceptic.test.opt.service.dto.BlackListRecordDTO;
import com.acceptic.test.opt.service.mapper.BlackListRecordMapper;
import com.acceptic.test.opt.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.acceptic.test.opt.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BlackListRecordResource REST controller.
 *
 * @see BlackListRecordResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OptimizationJobApp.class)
public class BlackListRecordResourceIntTest {

    @Autowired
    private BlackListRecordRepository blackListRecordRepository;

    @Autowired
    private BlackListRecordMapper blackListRecordMapper;

    @Autowired
    private BlackListRecordService blackListRecordService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBlackListRecordMockMvc;

    private BlackListRecord blackListRecord;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BlackListRecordResource blackListRecordResource = new BlackListRecordResource(blackListRecordService);
        this.restBlackListRecordMockMvc = MockMvcBuilders.standaloneSetup(blackListRecordResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BlackListRecord createEntity(EntityManager em) {
        BlackListRecord blackListRecord = new BlackListRecord();
        return blackListRecord;
    }

    @Before
    public void initTest() {
        blackListRecord = createEntity(em);
    }

    @Test
    @Transactional
    public void createBlackListRecord() throws Exception {
        int databaseSizeBeforeCreate = blackListRecordRepository.findAll().size();

        // Create the BlackListRecord
        BlackListRecordDTO blackListRecordDTO = blackListRecordMapper.toDto(blackListRecord);
        restBlackListRecordMockMvc.perform(post("/api/black-list-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blackListRecordDTO)))
            .andExpect(status().isCreated());

        // Validate the BlackListRecord in the database
        List<BlackListRecord> blackListRecordList = blackListRecordRepository.findAll();
        assertThat(blackListRecordList).hasSize(databaseSizeBeforeCreate + 1);
        BlackListRecord testBlackListRecord = blackListRecordList.get(blackListRecordList.size() - 1);
    }

    @Test
    @Transactional
    public void createBlackListRecordWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = blackListRecordRepository.findAll().size();

        // Create the BlackListRecord with an existing ID
        blackListRecord.setId(1L);
        BlackListRecordDTO blackListRecordDTO = blackListRecordMapper.toDto(blackListRecord);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBlackListRecordMockMvc.perform(post("/api/black-list-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blackListRecordDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BlackListRecord in the database
        List<BlackListRecord> blackListRecordList = blackListRecordRepository.findAll();
        assertThat(blackListRecordList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBlackListRecords() throws Exception {
        // Initialize the database
        blackListRecordRepository.saveAndFlush(blackListRecord);

        // Get all the blackListRecordList
        restBlackListRecordMockMvc.perform(get("/api/black-list-records?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(blackListRecord.getId().intValue())));
    }

    @Test
    @Transactional
    public void getBlackListRecord() throws Exception {
        // Initialize the database
        blackListRecordRepository.saveAndFlush(blackListRecord);

        // Get the blackListRecord
        restBlackListRecordMockMvc.perform(get("/api/black-list-records/{id}", blackListRecord.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(blackListRecord.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBlackListRecord() throws Exception {
        // Get the blackListRecord
        restBlackListRecordMockMvc.perform(get("/api/black-list-records/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBlackListRecord() throws Exception {
        // Initialize the database
        blackListRecordRepository.saveAndFlush(blackListRecord);
        int databaseSizeBeforeUpdate = blackListRecordRepository.findAll().size();

        // Update the blackListRecord
        BlackListRecord updatedBlackListRecord = blackListRecordRepository.findOne(blackListRecord.getId());
        // Disconnect from session so that the updates on updatedBlackListRecord are not directly saved in db
        em.detach(updatedBlackListRecord);
        BlackListRecordDTO blackListRecordDTO = blackListRecordMapper.toDto(updatedBlackListRecord);

        restBlackListRecordMockMvc.perform(put("/api/black-list-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blackListRecordDTO)))
            .andExpect(status().isOk());

        // Validate the BlackListRecord in the database
        List<BlackListRecord> blackListRecordList = blackListRecordRepository.findAll();
        assertThat(blackListRecordList).hasSize(databaseSizeBeforeUpdate);
        BlackListRecord testBlackListRecord = blackListRecordList.get(blackListRecordList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingBlackListRecord() throws Exception {
        int databaseSizeBeforeUpdate = blackListRecordRepository.findAll().size();

        // Create the BlackListRecord
        BlackListRecordDTO blackListRecordDTO = blackListRecordMapper.toDto(blackListRecord);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBlackListRecordMockMvc.perform(put("/api/black-list-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blackListRecordDTO)))
            .andExpect(status().isCreated());

        // Validate the BlackListRecord in the database
        List<BlackListRecord> blackListRecordList = blackListRecordRepository.findAll();
        assertThat(blackListRecordList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBlackListRecord() throws Exception {
        // Initialize the database
        blackListRecordRepository.saveAndFlush(blackListRecord);
        int databaseSizeBeforeDelete = blackListRecordRepository.findAll().size();

        // Get the blackListRecord
        restBlackListRecordMockMvc.perform(delete("/api/black-list-records/{id}", blackListRecord.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BlackListRecord> blackListRecordList = blackListRecordRepository.findAll();
        assertThat(blackListRecordList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BlackListRecord.class);
        BlackListRecord blackListRecord1 = new BlackListRecord();
        blackListRecord1.setId(1L);
        BlackListRecord blackListRecord2 = new BlackListRecord();
        blackListRecord2.setId(blackListRecord1.getId());
        assertThat(blackListRecord1).isEqualTo(blackListRecord2);
        blackListRecord2.setId(2L);
        assertThat(blackListRecord1).isNotEqualTo(blackListRecord2);
        blackListRecord1.setId(null);
        assertThat(blackListRecord1).isNotEqualTo(blackListRecord2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BlackListRecordDTO.class);
        BlackListRecordDTO blackListRecordDTO1 = new BlackListRecordDTO();
        blackListRecordDTO1.setId(1L);
        BlackListRecordDTO blackListRecordDTO2 = new BlackListRecordDTO();
        assertThat(blackListRecordDTO1).isNotEqualTo(blackListRecordDTO2);
        blackListRecordDTO2.setId(blackListRecordDTO1.getId());
        assertThat(blackListRecordDTO1).isEqualTo(blackListRecordDTO2);
        blackListRecordDTO2.setId(2L);
        assertThat(blackListRecordDTO1).isNotEqualTo(blackListRecordDTO2);
        blackListRecordDTO1.setId(null);
        assertThat(blackListRecordDTO1).isNotEqualTo(blackListRecordDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(blackListRecordMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(blackListRecordMapper.fromId(null)).isNull();
    }
}
