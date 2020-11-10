package br.univali.tccbackend;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

public class ContextValues {

  private final Context context;

  public ContextValues() throws NamingException {
    context = (Context) new InitialContext().lookup("java:/comp/env");
  }

  public String lookupPmdRulesetPath() throws NamingException {
    return lookupString("pmd-ruleset-path");
  }

  private String lookupString(String name) throws NamingException {
    return (String) context.lookup(name);
  }

  public String lookupFrontendUrl() throws NamingException {
    return lookupString("front-end-url");
  }

}
