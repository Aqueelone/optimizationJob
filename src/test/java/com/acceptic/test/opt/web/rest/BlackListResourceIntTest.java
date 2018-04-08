package com.acceptic.test.opt.web.rest;

import com.acceptic.test.opt.OptimizationJobApp;

import com.acceptic.test.opt.domain.BlackList;
import com.acceptic.test.opt.repository.BlackListRepository;
import com.acceptic.test.opt.service.BlackListService;
import com.acceptic.test.opt.service.dto.BlackListDTO;
import com.acceptic.test.opt.service.mapper.BlackListMapper;
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
 * Test class for the BlackListResource REST controller.
 *
 * @see BlackListResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OptimizationJobApp.class)
public class BlackListResourceIntTest {

    @Autowired
    private BlackListRepository blackListRepository;

    @Autowired
    private BlackListMapper blackListMapper;

    @Autowired
    private BlackListService blackListService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBlackListMockMvc;

    private BlackList blackList;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BlackListResource blackListResource = new BlackListResource(blackListService);
        this.restBlackListMockMvc = MockMvcBuilders.standaloneSetup(blackListResource)
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
    public static BlackList createEntity(EntityManager em) {
        BlackList blackList = new BlackList();
        return blackList;
    }

    @Before
    public void initTest() {
        blackList = createEntity(em);
    }

    @Test
    @Transactional
    public void createBlackList() throws Exception {
        int databaseSizeBeforeCreate = blackListRepository.findAll().size();

        // Create the BlackList
        BlackListDTO blackListDTO = blackListMapper.toDto(blackList);
        restBlackListMockMvc.perform(post("/api/black-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blackListDTO)))
            .andExpect(status().isCreated());

        // Validate the BlackList in the database
        List<BlackList> blackListList = blackListRepository.findAll();
        assertThat(blackListList).hasSize(databaseSizeBeforeCreate + 1);
        BlackList testBlackList = blackListList.get(blackListList.size() - 1);
    }

    @Test
    @Transactional
    public void createBlackListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = blackListRepository.findAll().size();

        // Create the BlackList with an existing ID
        blackList.setId(1L);
        BlackListDTO blackListDTO = blackListMapper.toDto(blackList);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBlackListMockMvc.perform(post("/api/black-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blackListDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BlackList in the database
        List<BlackList> blackListList = blackListRepository.findAll();
        assertThat(blackListList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBlackLists() throws Exception {
        // Initialize the database
        blackListRepository.saveAndFlush(blackList);

        // Get all the blackListList
        restBlackListMockMvc.perform(get("/api/black-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(blackList.getId().intValue())));
    }

    @Test
    @Transactional
    public void getBlackList() throws Exception {
        // Initialize the database
        blackListRepository.saveAndFlush(blackList);

        // Get the blackList
        restBlackListMockMvc.perform(get("/api/black-lists/{id}", blackList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(blackList.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBlackList() throws Exception {
        // Get the blackList
        restBlackListMockMvc.perform(get("/api/black-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBlackList() throws Exception {
        // Initialize the database
        blackListRepository.saveAndFlush(blackList);
        int databaseSizeBeforeUpdate = blackListRepository.findAll().size();

        // Update the blackList
        BlackList updatedBlackList = blackListRepository.findOne(blackList.getId());
        // Disconnect from session so that the updates on updatedBlackList are not directly saved in db
        em.detach(updatedBlackList);
        BlackListDTO blackListDTO = blackListMapper.toDto(updatedBlackList);

        restBlackListMockMvc.perform(put("/api/black-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blackListDTO)))
            .andExpect(status().isOk());

        // Validate the BlackList in the database
        List<BlackList> blackListList = blackListRepository.findAll();
        assertThat(blackListList).hasSize(databaseSizeBeforeUpdate);
        BlackList testBlackList = blackListList.get(blackListList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingBlackList() throws Exception {
        int databaseSizeBeforeUpdate = blackListRepository.findAll().size();

        // Create the BlackList
        BlackListDTO blackListDTO = blackListMapper.toDto(blackList);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBlackListMockMvc.perform(put("/api/black-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blackListDTO)))
            .andExpect(status().isCreated());

        // Validate the BlackList in the database
        List<BlackList> blackListList = blackListRepository.findAll();
        assertThat(blackListList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBlackList() throws Exception {
        // Initialize the database
        blackListRepository.saveAndFlush(blackList);
        int databaseSizeBeforeDelete = blackListRepository.findAll().size();

        // Get the blackList
        restBlackListMockMvc.perform(delete("/api/black-lists/{id}", blackList.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BlackList> blackListList = blackListRepository.findAll();
        assertThat(blackListList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BlackList.class);
        BlackList blackList1 = new BlackList();
        blackList1.setId(1L);
        BlackList blackList2 = new BlackList();
        blackList2.setId(blackList1.getId());
        assertThat(blackList1).isEqualTo(blackList2);
        blackList2.setId(2L);
        assertThat(blackList1).isNotEqualTo(blackList2);
        blackList1.setId(null);
        assertThat(blackList1).isNotEqualTo(blackList2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BlackListDTO.class);
        BlackListDTO blackListDTO1 = new BlackListDTO();
        blackListDTO1.setId(1L);
        BlackListDTO blackListDTO2 = new BlackListDTO();
        assertThat(blackListDTO1).isNotEqualTo(blackListDTO2);
        blackListDTO2.setId(blackListDTO1.getId());
        assertThat(blackListDTO1).isEqualTo(blackListDTO2);
        blackListDTO2.setId(2L);
        assertThat(blackListDTO1).isNotEqualTo(blackListDTO2);
        blackListDTO1.setId(null);
        assertThat(blackListDTO1).isNotEqualTo(blackListDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(blackListMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(blackListMapper.fromId(null)).isNull();
    }
}
