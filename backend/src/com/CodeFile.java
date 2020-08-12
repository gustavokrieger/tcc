package com;

import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;

public class CodeFile {

    private String name;

    private InputStream inputStream;

    CodeFile(String name, InputStream inputStream) {
        this.name = name;
        this.inputStream = inputStream;
    }

    public static CodeFile fromHttpPart(Part part) throws IOException {
        String name = part.getSubmittedFileName();
        InputStream inputStream = part.getInputStream();
        return new CodeFile(name, inputStream);
    }

}
