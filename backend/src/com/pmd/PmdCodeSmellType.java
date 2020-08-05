package com.pmd;

import com.CodeSmellType;

enum PmdCodeSmellType implements CodeSmellType {

    LONG_METHOD("ExcessiveMethodLength");

    private final String value;

    PmdCodeSmellType(String value) {
        this.value = value;
    }

    public String value() {
        return value;
    }

}
