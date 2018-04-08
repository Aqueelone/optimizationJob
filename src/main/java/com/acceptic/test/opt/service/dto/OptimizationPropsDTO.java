package com.acceptic.test.opt.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the OptimizationProps entity.
 */
public class OptimizationPropsDTO implements Serializable {

    private Long id;

    @NotNull
    private Long threshold;

    @NotNull
    private String sourceEvent;

    @NotNull
    private Float ratioThreshold;

    @NotNull
    private String measuredEvent;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getThreshold() {
        return threshold;
    }

    public void setThreshold(Long threshold) {
        this.threshold = threshold;
    }

    public String getSourceEvent() {
        return sourceEvent;
    }

    public void setSourceEvent(String sourceEvent) {
        this.sourceEvent = sourceEvent;
    }

    public Float getRatioThreshold() {
        return ratioThreshold;
    }

    public void setRatioThreshold(Float ratioThreshold) {
        this.ratioThreshold = ratioThreshold;
    }

    public String getMeasuredEvent() {
        return measuredEvent;
    }

    public void setMeasuredEvent(String measuredEvent) {
        this.measuredEvent = measuredEvent;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OptimizationPropsDTO optimizationPropsDTO = (OptimizationPropsDTO) o;
        if(optimizationPropsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), optimizationPropsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OptimizationPropsDTO{" +
            "id=" + getId() +
            ", threshold=" + getThreshold() +
            ", sourceEvent='" + getSourceEvent() + "'" +
            ", ratioThreshold=" + getRatioThreshold() +
            ", measuredEvent='" + getMeasuredEvent() + "'" +
            "}";
    }
}
