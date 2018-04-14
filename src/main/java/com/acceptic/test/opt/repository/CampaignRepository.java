package com.acceptic.test.opt.repository;

import com.acceptic.test.opt.domain.BlackList;
import com.acceptic.test.opt.domain.Campaign;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.Optional;


/**
 * Spring Data JPA repository for the Campaign entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long> {

    Optional<Campaign> getByBlacklist(BlackList blackList);
}
