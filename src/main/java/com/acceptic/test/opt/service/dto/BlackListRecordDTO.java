package com.acceptic.test.opt.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the BlackListRecord entity.
 */
public class BlackListRecordDTO implements Serializable {

    private Long id;

    private Long publisherId;

    private Long blackListId;

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

    public Long getBlackListId() {
        return blackListId;
    }

    public void setBlackListId(Long blackListId) {
        this.blackListId = blackListId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BlackListRecordDTO blackListRecordDTO = (BlackListRecordDTO) o;
        if(blackListRecordDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), blackListRecordDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BlackListRecordDTO{" +
            "id=" + getId() +
            "}";
    }
}
