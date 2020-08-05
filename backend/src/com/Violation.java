package com;

import java.io.File;

class Violation {
    // todo econtrar métodos adicinais, para que não permaceça uma classe de dados

    private File file;

    private CodeSmellType codeSmellType;

    private int beginningLine;

    private int endingLine;

    private int beginningColumn;

    private int endingColumn;

    public CodeSmellType getCodeSmellType() {
        return codeSmellType;
    }

    public void setCodeSmellType(CodeSmellType codeSmellType) {
        this.codeSmellType = codeSmellType;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }

    public int getBeginningLine() {
        return beginningLine;
    }

    public void setBeginningLine(int beginningLine) {
        this.beginningLine = beginningLine;
    }

    public int getEndingLine() {
        return endingLine;
    }

    public void setEndingLine(int endingLine) {
        this.endingLine = endingLine;
    }

    public int getBeginningColumn() {
        return beginningColumn;
    }

    public void setBeginningColumn(int beginningColumn) {
        this.beginningColumn = beginningColumn;
    }

    public int getEndingColumn() {
        return endingColumn;
    }

    public void setEndingColumn(int endingColumn) {
        this.endingColumn = endingColumn;
    }

}
