package com.pwr.warehousesystem.enumeration;

public enum ItemSize {
    SMALL(1),
    MEDIUM(2),
    BIG(3);

    final int size;
    ItemSize(int size) {
        this.size = size;
    }


}
