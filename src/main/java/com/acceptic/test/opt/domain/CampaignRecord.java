package com.acceptic.test.opt.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CampaignRecord.
 */
@Entity
@Table(name = "campaign_record")
public class CampaignRecord implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Publisher publisher;

    @ManyToOne
    private Campaign campaign;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Publisher getPublisher() {
        return publisher;
    }

    public CampaignRecord publisher(Publisher publisher) {
        this.publisher = publisher;
        return this;
    }

    public void setPublisher(Publisher publisher) {
        this.publisher = publisher;
    }

    public Campaign getCampaign() {
        return campaign;
    }

    public CampaignRecord campaign(Campaign campaign) {
        this.campaign = campaign;
        return this;
    }

    public void setCampaign(Campaign campaign) {
        this.campaign = campaign;
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
        CampaignRecord campaignRecord = (CampaignRecord) o;
        if (campaignRecord.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), campaignRecord.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CampaignRecord{" +
            "id=" + getId() +
            "}";
    }
}
