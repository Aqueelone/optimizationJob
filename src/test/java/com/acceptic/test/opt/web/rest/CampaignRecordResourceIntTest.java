package com.acceptic.test.opt.web.rest;

import com.acceptic.test.opt.OptimizationJobApp;

import com.acceptic.test.opt.domain.CampaignRecord;
import com.acceptic.test.opt.repository.CampaignRecordRepository;
import com.acceptic.test.opt.service.CampaignRecordService;
import com.acceptic.test.opt.service.dto.CampaignRecordDTO;
import com.acceptic.test.opt.service.mapper.CampaignRecordMapper;
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
 * Test class for the CampaignRecordResource REST controller.
 *
 * @see CampaignRecordResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OptimizationJobApp.class)
public class CampaignRecordResourceIntTest {

    @Autowired
    private CampaignRecordRepository campaignRecordRepository;

    @Autowired
    private CampaignRecordMapper campaignRecordMapper;

    @Autowired
    private CampaignRecordService campaignRecordService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCampaignRecordMockMvc;

    private CampaignRecord campaignRecord;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CampaignRecordResource campaignRecordResource = new CampaignRecordResource(campaignRecordService);
        this.restCampaignRecordMockMvc = MockMvcBuilders.standaloneSetup(campaignRecordResource)
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
    public static CampaignRecord createEntity(EntityManager em) {
        CampaignRecord campaignRecord = new CampaignRecord();
        return campaignRecord;
    }

    @Before
    public void initTest() {
        campaignRecord = createEntity(em);
    }

    @Test
    @Transactional
    public void createCampaignRecord() throws Exception {
        int databaseSizeBeforeCreate = campaignRecordRepository.findAll().size();

        // Create the CampaignRecord
        CampaignRecordDTO campaignRecordDTO = campaignRecordMapper.toDto(campaignRecord);
        restCampaignRecordMockMvc.perform(post("/api/campaign-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campaignRecordDTO)))
            .andExpect(status().isCreated());

        // Validate the CampaignRecord in the database
        List<CampaignRecord> campaignRecordList = campaignRecordRepository.findAll();
        assertThat(campaignRecordList).hasSize(databaseSizeBeforeCreate + 1);
        CampaignRecord testCampaignRecord = campaignRecordList.get(campaignRecordList.size() - 1);
    }

    @Test
    @Transactional
    public void createCampaignRecordWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = campaignRecordRepository.findAll().size();

        // Create the CampaignRecord with an existing ID
        campaignRecord.setId(1L);
        CampaignRecordDTO campaignRecordDTO = campaignRecordMapper.toDto(campaignRecord);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCampaignRecordMockMvc.perform(post("/api/campaign-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campaignRecordDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CampaignRecord in the database
        List<CampaignRecord> campaignRecordList = campaignRecordRepository.findAll();
        assertThat(campaignRecordList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCampaignRecords() throws Exception {
        // Initialize the database
        campaignRecordRepository.saveAndFlush(campaignRecord);

        // Get all the campaignRecordList
        restCampaignRecordMockMvc.perform(get("/api/campaign-records?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(campaignRecord.getId().intValue())));
    }

    @Test
    @Transactional
    public void getCampaignRecord() throws Exception {
        // Initialize the database
        campaignRecordRepository.saveAndFlush(campaignRecord);

        // Get the campaignRecord
        restCampaignRecordMockMvc.perform(get("/api/campaign-records/{id}", campaignRecord.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(campaignRecord.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCampaignRecord() throws Exception {
        // Get the campaignRecord
        restCampaignRecordMockMvc.perform(get("/api/campaign-records/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCampaignRecord() throws Exception {
        // Initialize the database
        campaignRecordRepository.saveAndFlush(campaignRecord);
        int databaseSizeBeforeUpdate = campaignRecordRepository.findAll().size();

        // Update the campaignRecord
        CampaignRecord updatedCampaignRecord = campaignRecordRepository.findOne(campaignRecord.getId());
        // Disconnect from session so that the updates on updatedCampaignRecord are not directly saved in db
        em.detach(updatedCampaignRecord);
        CampaignRecordDTO campaignRecordDTO = campaignRecordMapper.toDto(updatedCampaignRecord);

        restCampaignRecordMockMvc.perform(put("/api/campaign-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campaignRecordDTO)))
            .andExpect(status().isOk());

        // Validate the CampaignRecord in the database
        List<CampaignRecord> campaignRecordList = campaignRecordRepository.findAll();
        assertThat(campaignRecordList).hasSize(databaseSizeBeforeUpdate);
        CampaignRecord testCampaignRecord = campaignRecordList.get(campaignRecordList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingCampaignRecord() throws Exception {
        int databaseSizeBeforeUpdate = campaignRecordRepository.findAll().size();

        // Create the CampaignRecord
        CampaignRecordDTO campaignRecordDTO = campaignRecordMapper.toDto(campaignRecord);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCampaignRecordMockMvc.perform(put("/api/campaign-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campaignRecordDTO)))
            .andExpect(status().isCreated());

        // Validate the CampaignRecord in the database
        List<CampaignRecord> campaignRecordList = campaignRecordRepository.findAll();
        assertThat(campaignRecordList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCampaignRecord() throws Exception {
        // Initialize the database
        campaignRecordRepository.saveAndFlush(campaignRecord);
        int databaseSizeBeforeDelete = campaignRecordRepository.findAll().size();

        // Get the campaignRecord
        restCampaignRecordMockMvc.perform(delete("/api/campaign-records/{id}", campaignRecord.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CampaignRecord> campaignRecordList = campaignRecordRepository.findAll();
        assertThat(campaignRecordList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CampaignRecord.class);
        CampaignRecord campaignRecord1 = new CampaignRecord();
        campaignRecord1.setId(1L);
        CampaignRecord campaignRecord2 = new CampaignRecord();
        campaignRecord2.setId(campaignRecord1.getId());
        assertThat(campaignRecord1).isEqualTo(campaignRecord2);
        campaignRecord2.setId(2L);
        assertThat(campaignRecord1).isNotEqualTo(campaignRecord2);
        campaignRecord1.setId(null);
        assertThat(campaignRecord1).isNotEqualTo(campaignRecord2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CampaignRecordDTO.class);
        CampaignRecordDTO campaignRecordDTO1 = new CampaignRecordDTO();
        campaignRecordDTO1.setId(1L);
        CampaignRecordDTO campaignRecordDTO2 = new CampaignRecordDTO();
        assertThat(campaignRecordDTO1).isNotEqualTo(campaignRecordDTO2);
        campaignRecordDTO2.setId(campaignRecordDTO1.getId());
        assertThat(campaignRecordDTO1).isEqualTo(campaignRecordDTO2);
        campaignRecordDTO2.setId(2L);
        assertThat(campaignRecordDTO1).isNotEqualTo(campaignRecordDTO2);
        campaignRecordDTO1.setId(null);
        assertThat(campaignRecordDTO1).isNotEqualTo(campaignRecordDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(campaignRecordMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(campaignRecordMapper.fromId(null)).isNull();
    }
}
