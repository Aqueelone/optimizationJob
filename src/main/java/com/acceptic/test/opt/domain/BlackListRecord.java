package com.acceptic.test.opt.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A BlackListRecord.
 */
@Entity
@Table(name = "black_list_record")
public class BlackListRecord implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Publisher publisher;

    @ManyToOne
    private BlackList blackList;

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

    public BlackListRecord publisher(Publisher publisher) {
        this.publisher = publisher;
        return this;
    }

    public void setPublisher(Publisher publisher) {
        this.publisher = publisher;
    }

    public BlackList getBlackList() {
        return blackList;
    }

    public BlackListRecord blackList(BlackList blackList) {
        this.blackList = blackList;
        return this;
    }

    public void setBlackList(BlackList blackList) {
        this.blackList = blackList;
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
        BlackListRecord blackListRecord = (BlackListRecord) o;
        if (blackListRecord.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), blackListRecord.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BlackListRecord{" +
            "id=" + getId() +
            "}";
    }
}
