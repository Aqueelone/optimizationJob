package com.acceptic.test.opt.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the BlackList entity.
 */
public class BlackListDTO implements Serializable {

    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BlackListDTO blackListDTO = (BlackListDTO) o;
        if(blackListDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), blackListDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BlackListDTO{" +
            "id=" + getId() +
            "}";
    }
}
