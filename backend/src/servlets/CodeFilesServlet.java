package servlets;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Collection;

@MultipartConfig
@WebServlet(name = "CodeFiles", displayName = "CodeFilesServlet", urlPatterns = "/code-files")
public class CodeFilesServlet extends HttpServlet {

    // todo confirmar se deve ser post
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

        Path tempDirectoryPath = Files.createTempDirectory("");
        File tempDirectory = tempDirectoryPath.toFile();
        tempDirectory.deleteOnExit();

        Collection<Part> parts = request.getParts();
        for (Part part : parts) {
            String name = part.getName();
            if (!name.equals("file")) {
                continue;
            }

            Path filePath;
            filePath = tempDirectoryPath.resolve("test.java");

            part.write(filePath.toString());

            File file = filePath.toFile();
            file.deleteOnExit();
        }

        return;
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //todo implementar
        super.doOptions(request, response);
    }

}
