package com.acceptic.test.opt.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Campaign entity.
 */
public class CampaignDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    private Long optimizationPropsId;

    private Long blacklistId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getOptimizationPropsId() {
        return optimizationPropsId;
    }

    public void setOptimizationPropsId(Long optimizationPropsId) {
        this.optimizationPropsId = optimizationPropsId;
    }

    public Long getBlacklistId() {
        return blacklistId;
    }

    public void setBlacklistId(Long blackListId) {
        this.blacklistId = blackListId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CampaignDTO campaignDTO = (CampaignDTO) o;
        if(campaignDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), campaignDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CampaignDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
