package servlets;

import com.google.gson.JsonObject;
import com.pmd.PmdRunner;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

@MultipartConfig
@WebServlet(name = "CodeFiles", displayName = "CodeFilesServlet", urlPatterns = "/code-files")
public class CodeFilesServlet extends HttpServlet {

  // todo confirmar se deve ser post
  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

    // todo passar para métodos
    List<Path> files = new ArrayList<>();
    Path tempDirectory = Files.createTempDirectory("");
    try {
      Collection<Part> parts = request.getParts();
      for (Part part : parts) {
        String name = part.getName();
        if (!name.equals("file")) {
          continue;
        }

        String fileName = part.getSubmittedFileName();
        Path file = tempDirectory.resolve(fileName);
        files.add(file);

        part.write(file.toString());
      }

      PmdRunner pmdRunner = new PmdRunner();
      JsonObject jsonObject = pmdRunner.run(tempDirectory.toString());

      PrintWriter printWriter = response.getWriter();
      printWriter.print(jsonObject.toString());
      printWriter.flush();
    } finally {
      for (Path file : files) {
        Files.delete(file);
      }
      Files.delete(tempDirectory);
    }
  }

  @Override
  protected void doOptions(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    //todo implementar
    super.doOptions(request, response);
  }

}
