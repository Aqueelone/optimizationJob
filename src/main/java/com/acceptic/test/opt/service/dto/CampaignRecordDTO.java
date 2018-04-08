package com.acceptic.test.opt.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the CampaignRecord entity.
 */
public class CampaignRecordDTO implements Serializable {

    private Long id;

    private Long publisherId;

    private Long campaignId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPublisherId() {
        return publisherId;
    }

    public void setPublisherId(Long publisherId) {
        this.publisherId = publisherId;
    }

    public Long getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(Long campaignId) {
        this.campaignId = campaignId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CampaignRecordDTO campaignRecordDTO = (CampaignRecordDTO) o;
        if(campaignRecordDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), campaignRecordDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CampaignRecordDTO{" +
            "id=" + getId() +
            "}";
    }
}
