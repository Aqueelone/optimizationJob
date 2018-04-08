package com.acceptic.test.opt.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Campaign.
 */
@Entity
@Table(name = "campaign")
public class Campaign implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToOne
    @JoinColumn(unique = true)
    private OptimizationProps optimizationProps;

    @OneToOne
    @JoinColumn(unique = true)
    private BlackList blacklist;

    @OneToMany(mappedBy = "campaign")
    @JsonIgnore
    private Set<Event> events = new HashSet<>();

    @OneToMany(mappedBy = "campaign")
    @JsonIgnore
    private Set<CampaignRecord> campaignRecords = new HashSet<>();

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

    public Campaign name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public OptimizationProps getOptimizationProps() {
        return optimizationProps;
    }

    public Campaign optimizationProps(OptimizationProps optimizationProps) {
        this.optimizationProps = optimizationProps;
        return this;
    }

    public void setOptimizationProps(OptimizationProps optimizationProps) {
        this.optimizationProps = optimizationProps;
    }

    public BlackList getBlacklist() {
        return blacklist;
    }

    public Campaign blacklist(BlackList blackList) {
        this.blacklist = blackList;
        return this;
    }

    public void setBlacklist(BlackList blackList) {
        this.blacklist = blackList;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public Campaign events(Set<Event> events) {
        this.events = events;
        return this;
    }

    public Campaign addEvents(Event event) {
        this.events.add(event);
        event.setCampaign(this);
        return this;
    }

    public Campaign removeEvents(Event event) {
        this.events.remove(event);
        event.setCampaign(null);
        return this;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    public Set<CampaignRecord> getCampaignRecords() {
        return campaignRecords;
    }

    public Campaign campaignRecords(Set<CampaignRecord> campaignRecords) {
        this.campaignRecords = campaignRecords;
        return this;
    }

    public Campaign addCampaignRecord(CampaignRecord campaignRecord) {
        this.campaignRecords.add(campaignRecord);
        campaignRecord.setCampaign(this);
        return this;
    }

    public Campaign removeCampaignRecord(CampaignRecord campaignRecord) {
        this.campaignRecords.remove(campaignRecord);
        campaignRecord.setCampaign(null);
        return this;
    }

    public void setCampaignRecords(Set<CampaignRecord> campaignRecords) {
        this.campaignRecords = campaignRecords;
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
        Campaign campaign = (Campaign) o;
        if (campaign.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), campaign.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Campaign{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
