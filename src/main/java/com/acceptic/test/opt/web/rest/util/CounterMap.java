package com.acceptic.test.opt.web.rest.util;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.EnumMap;
import java.util.Optional;

/**
 * Expanded EnumMap class which is safety to using in counter task
 *
 * @param <V> Enum type for this counter
 */
public class CounterMap<V extends Enum<V>> extends EnumMap<V, Long> {

    /**
     * Creates an empty enum map with the specified key type.
     *
     * @param keyType the class object of the key type for this enum map
     * @throws NullPointerException if <tt>keyType</tt> is null
     */
    public CounterMap(Class<V> keyType) {
        super(keyType);
    }


    /**
     * Method which safety add +1 into value
     *
     * @param key which should be increase up
     * @return modified up counters in this CounterMap
     */
    public CounterMap<V> increment(V key){
        if(this.containsKey(key)) this.replace(key, Optional.of(this.get(key)).orElse(Long.MIN_VALUE) + 1L);
        else this.put(key, 1L);
        return this;
    }

    @JsonCreator
    public String toJson() throws JsonProcessingException {
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        return ow.writeValueAsString(this);
    }
}
