package com.acceptic.test.opt.repository;

import com.acceptic.test.opt.domain.BlackList;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the BlackList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlackListRepository extends JpaRepository<BlackList, Long> {

}
