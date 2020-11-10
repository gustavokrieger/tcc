package br.univali.tccbackend.pmd;

import br.univali.tccbackend.ContextValues;
import javax.naming.NamingException;
import net.sourceforge.pmd.PMD;
import net.sourceforge.pmd.PMDConfiguration;

class Pmd {

  private final PMDConfiguration pmdConfiguration = new PMDConfiguration();

  void configure(String inputPaths, String reportFile) throws NamingException {
    pmdConfiguration.setInputPaths(inputPaths);
    ContextValues contextValues = new ContextValues();
    String path = contextValues.lookupPmdRulesetPath();
    pmdConfiguration.setRuleSets(path);
    pmdConfiguration.setReportFormat("json");
    pmdConfiguration.setReportFile(reportFile);
  }

  void analyze() {
    PMD.doPMD(pmdConfiguration);
  }

}
