package com.acceptic.test.opt.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Publisher.
 */
@Entity
@Table(name = "publisher")
public class Publisher implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "publisher")
    @JsonIgnore
    private Set<Event> events = new HashSet<>();

    @OneToMany(mappedBy = "publisher")
    @JsonIgnore
    private Set<CampaignRecord> campaignRecords = new HashSet<>();

    @OneToMany(mappedBy = "publisher")
    @JsonIgnore
    private Set<BlackListRecord> blacklistRecords = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Publisher name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public Publisher events(Set<Event> events) {
        this.events = events;
        return this;
    }

    public Publisher addEvents(Event event) {
        this.events.add(event);
        event.setPublisher(this);
        return this;
    }

    public Publisher removeEvents(Event event) {
        this.events.remove(event);
        event.setPublisher(null);
        return this;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    public Set<CampaignRecord> getCampaignRecords() {
        return campaignRecords;
    }

    public Publisher campaignRecords(Set<CampaignRecord> campaignRecords) {
        this.campaignRecords = campaignRecords;
        return this;
    }

    public Publisher addCampaignRecord(CampaignRecord campaignRecord) {
        this.campaignRecords.add(campaignRecord);
        campaignRecord.setPublisher(this);
        return this;
    }

    public Publisher removeCampaignRecord(CampaignRecord campaignRecord) {
        this.campaignRecords.remove(campaignRecord);
        campaignRecord.setPublisher(null);
        return this;
    }

    public void setCampaignRecords(Set<CampaignRecord> campaignRecords) {
        this.campaignRecords = campaignRecords;
    }

    public Set<BlackListRecord> getBlacklistRecords() {
        return blacklistRecords;
    }

    public Publisher blacklistRecords(Set<BlackListRecord> blackListRecords) {
        this.blacklistRecords = blackListRecords;
        return this;
    }

    public Publisher addBlacklistRecord(BlackListRecord blackListRecord) {
        this.blacklistRecords.add(blackListRecord);
        blackListRecord.setPublisher(this);
        return this;
    }

    public Publisher removeBlacklistRecord(BlackListRecord blackListRecord) {
        this.blacklistRecords.remove(blackListRecord);
        blackListRecord.setPublisher(null);
        return this;
    }

    public void setBlacklistRecords(Set<BlackListRecord> blackListRecords) {
        this.blacklistRecords = blackListRecords;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Publisher publisher = (Publisher) o;
        if (publisher.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), publisher.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Publisher{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
