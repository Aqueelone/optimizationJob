package com.acceptic.test.opt.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A BlackList.
 */
@Entity
@Table(name = "black_list")
public class BlackList implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "blackList")
    @JsonIgnore
    private Set<BlackListRecord> blacklistRecords = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<BlackListRecord> getBlacklistRecords() {
        return blacklistRecords;
    }

    public BlackList blacklistRecords(Set<BlackListRecord> blackListRecords) {
        this.blacklistRecords = blackListRecords;
        return this;
    }

    public BlackList addBlacklistRecord(BlackListRecord blackListRecord) {
        this.blacklistRecords.add(blackListRecord);
        blackListRecord.setBlackList(this);
        return this;
    }

    public BlackList removeBlacklistRecord(BlackListRecord blackListRecord) {
        this.blacklistRecords.remove(blackListRecord);
        blackListRecord.setBlackList(null);
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
        BlackList blackList = (BlackList) o;
        if (blackList.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), blackList.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BlackList{" +
            "id=" + getId() +
            "}";
    }
}
