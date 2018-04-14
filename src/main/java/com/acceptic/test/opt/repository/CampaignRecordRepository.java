package com.acceptic.test.opt.repository;

import com.acceptic.test.opt.domain.Campaign;
import com.acceptic.test.opt.domain.CampaignRecord;
import com.acceptic.test.opt.domain.Publisher;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.Optional;


/**
 * Spring Data JPA repository for the CampaignRecord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CampaignRecordRepository extends JpaRepository<CampaignRecord, Long> {

    Optional<CampaignRecord> findCampaignRecordByCampaignAndPublisher(Campaign campaign, Publisher publisher);
}
