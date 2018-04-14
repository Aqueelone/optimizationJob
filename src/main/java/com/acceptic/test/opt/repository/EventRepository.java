package com.acceptic.test.opt.repository;

import com.acceptic.test.opt.domain.Event;
import net.bytebuddy.agent.builder.AgentBuilder;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.time.Instant;
import java.util.List;
import java.util.Optional;


/**
 * Spring Data JPA repository for the Event entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    Optional<List<Event>> findAllByCreatedBetween(Instant instant, Instant instNow);
}
