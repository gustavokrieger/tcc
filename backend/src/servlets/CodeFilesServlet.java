package servlets;

import com.CodeFile;
import com.CodeFiles;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.IOException;
import java.util.Collection;
import java.util.Enumeration;

@MultipartConfig
@WebServlet(name = "CodeFiles", displayName = "CodeFilesServlet", urlPatterns = "/code-files")
public class CodeFilesServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        return;
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

        Enumeration<String> headerNames = request.getHeaderNames();
        if (headerNames != null) {
            while (headerNames.hasMoreElements()) {
                System.out.println("Header: " + request.getHeader(headerNames.nextElement()));
            }
        }

        Collection<Part> parts = request.getParts();
        CodeFiles codeFiles = new CodeFiles();
        for (Part part : parts) {
            String name = part.getName();
            if (!name.equals("file")) {
                continue;
            }
            CodeFile codeFile = CodeFile.fromHttpPart(part);
            codeFiles.add(codeFile);
        }

//        List<Part> fileParts = request.getParts().stream().filter(part -> "file".equals(part.getName()) && part.getSize() > 0).collect(Collectors.toList());
//
//        for (Part filePart : fileParts) {
//            String fileName = Paths.get(filePart.getSubmittedFileName()).getFileName().toString();
//            InputStream fileContent = filePart.getInputStream();
//            return;
//        }
        return;
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //todo implementar
        super.doOptions(request, response);
    }

}
