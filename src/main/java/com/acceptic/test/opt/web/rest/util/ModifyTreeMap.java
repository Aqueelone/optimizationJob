package com.acceptic.test.opt.web.rest.util;

import java.util.TreeMap;

/**
 * some extended TreeMap
 *
 * @param <K> Key Type, should implement Comparable
 * @param <V> Value Type
 */
public class ModifyTreeMap<K, V> extends TreeMap<K, V> {

    @Override
    public V replace(K key, V newValue) {
        if(this.containsKey(key)) return super.replace(key, newValue);
        else return super.put(key, newValue);
    }
}
