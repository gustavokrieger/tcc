package br.univali.tccbackend.servlets;

import br.univali.tccbackend.CodeFilesService;
import br.univali.tccbackend.pmd.PmdAnalysisResult;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;
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

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    // todo passar segundo parametro para variavel
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    PmdAnalysisResult pmdAnalysisResult = runPmdAnalysis(request);
    sendResponseWithPmdAnalysisResult(response, pmdAnalysisResult);
  }

  private PmdAnalysisResult runPmdAnalysis(HttpServletRequest request)
      throws IOException, ServletException {
    Collection<Part> requestParts = request.getParts();
    CodeFilesService codeFilesService = new CodeFilesService(requestParts);
    return codeFilesService.runPmdAnalysis();
  }

  private void sendResponseWithPmdAnalysisResult(HttpServletResponse response,
      PmdAnalysisResult pmdAnalysisResult) throws IOException {
    PrintWriter printWriter = response.getWriter();
    printWriter.print(pmdAnalysisResult.toString());
    printWriter.flush();
  }

}
