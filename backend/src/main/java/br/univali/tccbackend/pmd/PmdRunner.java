package br.univali.tccbackend.pmd;

import java.io.IOException;
import javax.naming.NamingException;

public interface PmdRunner {

  PmdAnalysisResult run() throws IOException, NamingException;

}
