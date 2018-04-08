package com.acceptic.test.opt.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A OptimizationProps.
 */
@Entity
@Table(name = "optimization_props")
public class OptimizationProps implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "threshold", nullable = false)
    private Long threshold;

    @NotNull
    @Column(name = "source_event", nullable = false)
    private String sourceEvent;

    @NotNull
    @Column(name = "ratio_threshold", nullable = false)
    private Float ratioThreshold;

    @NotNull
    @Column(name = "measured_event", nullable = false)
    private String measuredEvent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getThreshold() {
        return threshold;
    }

    public OptimizationProps threshold(Long threshold) {
        this.threshold = threshold;
        return this;
    }

    public void setThreshold(Long threshold) {
        this.threshold = threshold;
    }

    public String getSourceEvent() {
        return sourceEvent;
    }

    public OptimizationProps sourceEvent(String sourceEvent) {
        this.sourceEvent = sourceEvent;
        return this;
    }

    public void setSourceEvent(String sourceEvent) {
        this.sourceEvent = sourceEvent;
    }

    public Float getRatioThreshold() {
        return ratioThreshold;
    }

    public OptimizationProps ratioThreshold(Float ratioThreshold) {
        this.ratioThreshold = ratioThreshold;
        return this;
    }

    public void setRatioThreshold(Float ratioThreshold) {
        this.ratioThreshold = ratioThreshold;
    }

    public String getMeasuredEvent() {
        return measuredEvent;
    }

    public OptimizationProps measuredEvent(String measuredEvent) {
        this.measuredEvent = measuredEvent;
        return this;
    }

    public void setMeasuredEvent(String measuredEvent) {
        this.measuredEvent = measuredEvent;
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
        OptimizationProps optimizationProps = (OptimizationProps) o;
        if (optimizationProps.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), optimizationProps.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OptimizationProps{" +
            "id=" + getId() +
            ", threshold=" + getThreshold() +
            ", sourceEvent='" + getSourceEvent() + "'" +
            ", ratioThreshold=" + getRatioThreshold() +
            ", measuredEvent='" + getMeasuredEvent() + "'" +
            "}";
    }
}
