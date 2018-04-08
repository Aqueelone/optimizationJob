package com.acceptic.test.opt.web.rest;

import com.acceptic.test.opt.OptimizationJobApp;

import com.acceptic.test.opt.domain.OptimizationProps;
import com.acceptic.test.opt.repository.OptimizationPropsRepository;
import com.acceptic.test.opt.service.OptimizationPropsService;
import com.acceptic.test.opt.service.dto.OptimizationPropsDTO;
import com.acceptic.test.opt.service.mapper.OptimizationPropsMapper;
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
 * Test class for the OptimizationPropsResource REST controller.
 *
 * @see OptimizationPropsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OptimizationJobApp.class)
public class OptimizationPropsResourceIntTest {

    private static final Long DEFAULT_THRESHOLD = 1L;
    private static final Long UPDATED_THRESHOLD = 2L;

    private static final String DEFAULT_SOURCE_EVENT = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE_EVENT = "BBBBBBBBBB";

    private static final Float DEFAULT_RATIO_THRESHOLD = 1F;
    private static final Float UPDATED_RATIO_THRESHOLD = 2F;

    private static final String DEFAULT_MEASURED_EVENT = "AAAAAAAAAA";
    private static final String UPDATED_MEASURED_EVENT = "BBBBBBBBBB";

    @Autowired
    private OptimizationPropsRepository optimizationPropsRepository;

    @Autowired
    private OptimizationPropsMapper optimizationPropsMapper;

    @Autowired
    private OptimizationPropsService optimizationPropsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOptimizationPropsMockMvc;

    private OptimizationProps optimizationProps;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OptimizationPropsResource optimizationPropsResource = new OptimizationPropsResource(optimizationPropsService);
        this.restOptimizationPropsMockMvc = MockMvcBuilders.standaloneSetup(optimizationPropsResource)
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
    public static OptimizationProps createEntity(EntityManager em) {
        OptimizationProps optimizationProps = new OptimizationProps()
            .threshold(DEFAULT_THRESHOLD)
            .sourceEvent(DEFAULT_SOURCE_EVENT)
            .ratioThreshold(DEFAULT_RATIO_THRESHOLD)
            .measuredEvent(DEFAULT_MEASURED_EVENT);
        return optimizationProps;
    }

    @Before
    public void initTest() {
        optimizationProps = createEntity(em);
    }

    @Test
    @Transactional
    public void createOptimizationProps() throws Exception {
        int databaseSizeBeforeCreate = optimizationPropsRepository.findAll().size();

        // Create the OptimizationProps
        OptimizationPropsDTO optimizationPropsDTO = optimizationPropsMapper.toDto(optimizationProps);
        restOptimizationPropsMockMvc.perform(post("/api/optimization-props")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(optimizationPropsDTO)))
            .andExpect(status().isCreated());

        // Validate the OptimizationProps in the database
        List<OptimizationProps> optimizationPropsList = optimizationPropsRepository.findAll();
        assertThat(optimizationPropsList).hasSize(databaseSizeBeforeCreate + 1);
        OptimizationProps testOptimizationProps = optimizationPropsList.get(optimizationPropsList.size() - 1);
        assertThat(testOptimizationProps.getThreshold()).isEqualTo(DEFAULT_THRESHOLD);
        assertThat(testOptimizationProps.getSourceEvent()).isEqualTo(DEFAULT_SOURCE_EVENT);
        assertThat(testOptimizationProps.getRatioThreshold()).isEqualTo(DEFAULT_RATIO_THRESHOLD);
        assertThat(testOptimizationProps.getMeasuredEvent()).isEqualTo(DEFAULT_MEASURED_EVENT);
    }

    @Test
    @Transactional
    public void createOptimizationPropsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = optimizationPropsRepository.findAll().size();

        // Create the OptimizationProps with an existing ID
        optimizationProps.setId(1L);
        OptimizationPropsDTO optimizationPropsDTO = optimizationPropsMapper.toDto(optimizationProps);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOptimizationPropsMockMvc.perform(post("/api/optimization-props")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(optimizationPropsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OptimizationProps in the database
        List<OptimizationProps> optimizationPropsList = optimizationPropsRepository.findAll();
        assertThat(optimizationPropsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkThresholdIsRequired() throws Exception {
        int databaseSizeBeforeTest = optimizationPropsRepository.findAll().size();
        // set the field null
        optimizationProps.setThreshold(null);

        // Create the OptimizationProps, which fails.
        OptimizationPropsDTO optimizationPropsDTO = optimizationPropsMapper.toDto(optimizationProps);

        restOptimizationPropsMockMvc.perform(post("/api/optimization-props")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(optimizationPropsDTO)))
            .andExpect(status().isBadRequest());

        List<OptimizationProps> optimizationPropsList = optimizationPropsRepository.findAll();
        assertThat(optimizationPropsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSourceEventIsRequired() throws Exception {
        int databaseSizeBeforeTest = optimizationPropsRepository.findAll().size();
        // set the field null
        optimizationProps.setSourceEvent(null);

        // Create the OptimizationProps, which fails.
        OptimizationPropsDTO optimizationPropsDTO = optimizationPropsMapper.toDto(optimizationProps);

        restOptimizationPropsMockMvc.perform(post("/api/optimization-props")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(optimizationPropsDTO)))
            .andExpect(status().isBadRequest());

        List<OptimizationProps> optimizationPropsList = optimizationPropsRepository.findAll();
        assertThat(optimizationPropsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRatioThresholdIsRequired() throws Exception {
        int databaseSizeBeforeTest = optimizationPropsRepository.findAll().size();
        // set the field null
        optimizationProps.setRatioThreshold(null);

        // Create the OptimizationProps, which fails.
        OptimizationPropsDTO optimizationPropsDTO = optimizationPropsMapper.toDto(optimizationProps);

        restOptimizationPropsMockMvc.perform(post("/api/optimization-props")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(optimizationPropsDTO)))
            .andExpect(status().isBadRequest());

        List<OptimizationProps> optimizationPropsList = optimizationPropsRepository.findAll();
        assertThat(optimizationPropsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMeasuredEventIsRequired() throws Exception {
        int databaseSizeBeforeTest = optimizationPropsRepository.findAll().size();
        // set the field null
        optimizationProps.setMeasuredEvent(null);

        // Create the OptimizationProps, which fails.
        OptimizationPropsDTO optimizationPropsDTO = optimizationPropsMapper.toDto(optimizationProps);

        restOptimizationPropsMockMvc.perform(post("/api/optimization-props")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(optimizationPropsDTO)))
            .andExpect(status().isBadRequest());

        List<OptimizationProps> optimizationPropsList = optimizationPropsRepository.findAll();
        assertThat(optimizationPropsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOptimizationProps() throws Exception {
        // Initialize the database
        optimizationPropsRepository.saveAndFlush(optimizationProps);

        // Get all the optimizationPropsList
        restOptimizationPropsMockMvc.perform(get("/api/optimization-props?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(optimizationProps.getId().intValue())))
            .andExpect(jsonPath("$.[*].threshold").value(hasItem(DEFAULT_THRESHOLD.intValue())))
            .andExpect(jsonPath("$.[*].sourceEvent").value(hasItem(DEFAULT_SOURCE_EVENT.toString())))
            .andExpect(jsonPath("$.[*].ratioThreshold").value(hasItem(DEFAULT_RATIO_THRESHOLD.doubleValue())))
            .andExpect(jsonPath("$.[*].measuredEvent").value(hasItem(DEFAULT_MEASURED_EVENT.toString())));
    }

    @Test
    @Transactional
    public void getOptimizationProps() throws Exception {
        // Initialize the database
        optimizationPropsRepository.saveAndFlush(optimizationProps);

        // Get the optimizationProps
        restOptimizationPropsMockMvc.perform(get("/api/optimization-props/{id}", optimizationProps.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(optimizationProps.getId().intValue()))
            .andExpect(jsonPath("$.threshold").value(DEFAULT_THRESHOLD.intValue()))
            .andExpect(jsonPath("$.sourceEvent").value(DEFAULT_SOURCE_EVENT.toString()))
            .andExpect(jsonPath("$.ratioThreshold").value(DEFAULT_RATIO_THRESHOLD.doubleValue()))
            .andExpect(jsonPath("$.measuredEvent").value(DEFAULT_MEASURED_EVENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOptimizationProps() throws Exception {
        // Get the optimizationProps
        restOptimizationPropsMockMvc.perform(get("/api/optimization-props/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOptimizationProps() throws Exception {
        // Initialize the database
        optimizationPropsRepository.saveAndFlush(optimizationProps);
        int databaseSizeBeforeUpdate = optimizationPropsRepository.findAll().size();

        // Update the optimizationProps
        OptimizationProps updatedOptimizationProps = optimizationPropsRepository.findOne(optimizationProps.getId());
        // Disconnect from session so that the updates on updatedOptimizationProps are not directly saved in db
        em.detach(updatedOptimizationProps);
        updatedOptimizationProps
            .threshold(UPDATED_THRESHOLD)
            .sourceEvent(UPDATED_SOURCE_EVENT)
            .ratioThreshold(UPDATED_RATIO_THRESHOLD)
            .measuredEvent(UPDATED_MEASURED_EVENT);
        OptimizationPropsDTO optimizationPropsDTO = optimizationPropsMapper.toDto(updatedOptimizationProps);

        restOptimizationPropsMockMvc.perform(put("/api/optimization-props")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(optimizationPropsDTO)))
            .andExpect(status().isOk());

        // Validate the OptimizationProps in the database
        List<OptimizationProps> optimizationPropsList = optimizationPropsRepository.findAll();
        assertThat(optimizationPropsList).hasSize(databaseSizeBeforeUpdate);
        OptimizationProps testOptimizationProps = optimizationPropsList.get(optimizationPropsList.size() - 1);
        assertThat(testOptimizationProps.getThreshold()).isEqualTo(UPDATED_THRESHOLD);
        assertThat(testOptimizationProps.getSourceEvent()).isEqualTo(UPDATED_SOURCE_EVENT);
        assertThat(testOptimizationProps.getRatioThreshold()).isEqualTo(UPDATED_RATIO_THRESHOLD);
        assertThat(testOptimizationProps.getMeasuredEvent()).isEqualTo(UPDATED_MEASURED_EVENT);
    }

    @Test
    @Transactional
    public void updateNonExistingOptimizationProps() throws Exception {
        int databaseSizeBeforeUpdate = optimizationPropsRepository.findAll().size();

        // Create the OptimizationProps
        OptimizationPropsDTO optimizationPropsDTO = optimizationPropsMapper.toDto(optimizationProps);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOptimizationPropsMockMvc.perform(put("/api/optimization-props")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(optimizationPropsDTO)))
            .andExpect(status().isCreated());

        // Validate the OptimizationProps in the database
        List<OptimizationProps> optimizationPropsList = optimizationPropsRepository.findAll();
        assertThat(optimizationPropsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOptimizationProps() throws Exception {
        // Initialize the database
        optimizationPropsRepository.saveAndFlush(optimizationProps);
        int databaseSizeBeforeDelete = optimizationPropsRepository.findAll().size();

        // Get the optimizationProps
        restOptimizationPropsMockMvc.perform(delete("/api/optimization-props/{id}", optimizationProps.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OptimizationProps> optimizationPropsList = optimizationPropsRepository.findAll();
        assertThat(optimizationPropsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OptimizationProps.class);
        OptimizationProps optimizationProps1 = new OptimizationProps();
        optimizationProps1.setId(1L);
        OptimizationProps optimizationProps2 = new OptimizationProps();
        optimizationProps2.setId(optimizationProps1.getId());
        assertThat(optimizationProps1).isEqualTo(optimizationProps2);
        optimizationProps2.setId(2L);
        assertThat(optimizationProps1).isNotEqualTo(optimizationProps2);
        optimizationProps1.setId(null);
        assertThat(optimizationProps1).isNotEqualTo(optimizationProps2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OptimizationPropsDTO.class);
        OptimizationPropsDTO optimizationPropsDTO1 = new OptimizationPropsDTO();
        optimizationPropsDTO1.setId(1L);
        OptimizationPropsDTO optimizationPropsDTO2 = new OptimizationPropsDTO();
        assertThat(optimizationPropsDTO1).isNotEqualTo(optimizationPropsDTO2);
        optimizationPropsDTO2.setId(optimizationPropsDTO1.getId());
        assertThat(optimizationPropsDTO1).isEqualTo(optimizationPropsDTO2);
        optimizationPropsDTO2.setId(2L);
        assertThat(optimizationPropsDTO1).isNotEqualTo(optimizationPropsDTO2);
        optimizationPropsDTO1.setId(null);
        assertThat(optimizationPropsDTO1).isNotEqualTo(optimizationPropsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(optimizationPropsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(optimizationPropsMapper.fromId(null)).isNull();
    }
}
