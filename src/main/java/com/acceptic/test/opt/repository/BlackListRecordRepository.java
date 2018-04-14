package com.acceptic.test.opt.repository;

import com.acceptic.test.opt.domain.BlackList;
import com.acceptic.test.opt.domain.BlackListRecord;
import com.acceptic.test.opt.domain.Publisher;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.Optional;


/**
 * Spring Data JPA repository for the BlackListRecord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlackListRecordRepository extends JpaRepository<BlackListRecord, Long> {

    Optional<BlackListRecord> findBlackListRecordByBlackListAndPublisher(BlackList blackList, Publisher publisher);
}
