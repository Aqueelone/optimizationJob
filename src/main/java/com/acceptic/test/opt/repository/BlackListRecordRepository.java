package com.acceptic.test.opt.repository;

import com.acceptic.test.opt.domain.BlackListRecord;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the BlackListRecord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlackListRecordRepository extends JpaRepository<BlackListRecord, Long> {

}
