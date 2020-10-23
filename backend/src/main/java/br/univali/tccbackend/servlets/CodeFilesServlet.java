package br.univali.tccbackend.servlets;

import br.univali.tccbackend.CodeFilesService;
import br.univali.tccbackend.pmd.PmdAnalysisResult;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.logging.Level;
import java.util.logging.Logger;
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

  private static final Logger LOGGER = Logger.getLogger(CodeFilesServlet.class.getName());

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response) {
    // todo passar segundo parametro para variavel
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    PrintWriter printWriter;
    PmdAnalysisResult pmdAnalysisResult;
    try {
      printWriter = response.getWriter();
      pmdAnalysisResult = runPmdAnalysis(request.getParts());
    } catch (RuntimeException | ServletException | IOException e) {
      LOGGER.log(Level.SEVERE, e.getMessage(), e);
      return;
    }
    sendResponseWithPmdAnalysisResult(printWriter, pmdAnalysisResult);
  }

  private static PmdAnalysisResult runPmdAnalysis(Collection<Part> requestParts)
      throws IOException {
    CodeFilesService codeFilesService = new CodeFilesService(requestParts);
    return codeFilesService.runPmdAnalysis();
  }

  private static void sendResponseWithPmdAnalysisResult(PrintWriter printWriter,
      PmdAnalysisResult pmdAnalysisResult) {
    printWriter.print(pmdAnalysisResult.toString());
    printWriter.flush();
  }

}
