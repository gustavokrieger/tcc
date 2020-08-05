package com.pmd;

import net.sourceforge.pmd.PMD;
import net.sourceforge.pmd.PMDConfiguration;

class Pmd {

    private final PMDConfiguration pmdConfiguration = new PMDConfiguration();

    void configure(String inputPaths, String reportFile) {
        pmdConfiguration.setInputPaths(inputPaths);
        pmdConfiguration.setRuleSets("pmd-ruleset.xml");
        pmdConfiguration.setReportFormat("json");
        pmdConfiguration.setReportFile(reportFile);
    }

    void analyze() {
        PMD.doPMD(pmdConfiguration);
    }

}
