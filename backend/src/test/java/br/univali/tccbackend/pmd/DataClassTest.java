package br.univali.tccbackend.pmd;

class DataClassTest extends PmdTest {

  @Override
  String getInputCode() {
    return
        "public class Property implements Comparable {\n"
            + "    private String      _name;\n"
            + "    private Class       _valueType;\n"
            + "    private Object      _initialValue;\n"
            + "    private Object      _currentValue;\n"
            + "    private Object[]    _availableValues;\n"
            + "    public Property(String name, Class valueType, Object initialValue) {\n"
            + "        this(name, valueType, initialValue, null);\n"
            + "    }\n"
            + "    public Property(String name, Class valueType, Object initialValue, Object[] values) {\n"
            + "        _name = name;\n"
            + "        _valueType = valueType;\n"
            + "        _initialValue = initialValue;\n"
            + "        _availableValues = values;\n"
            + "        _currentValue = _initialValue;\n"
            + "    }\n"
            + "    public String getName() {\n"
            + "        return _name;\n"
            + "    }\n"
            + "    public Class getValueType() {\n"
            + "        return _valueType;\n"
            + "    }\n"
            + "    public Object getInitialValue() {\n"
            + "        return _initialValue;\n"
            + "    }\n"
            + "    public Object[] getAvailableValues() {\n"
            + "        return _availableValues;\n"
            + "    }\n"
            + "    public Object getCurrentValue() {\n"
            + "        return _currentValue;\n"
            + "    }\n"
            + "    public void setCurrentValue(Object value) {\n"
            + "        _currentValue = value;\n"
            + "    }\n"
            + "    public int compareTo(Object o) {\n"
            + "        return _name.compareTo(((Property) o)._name);\n"
            + "    }\n"
            + "}";
  }

  @Override
  String getExpectedResult() {
    return "{\"formatVersion\":0,"
        + "\"pmdVersion\":\"" + PMD_VERSION + "\","
        + "\"timestamp\":\"\","
        + "\"files\":["
        + "{\"filename\":\"\","
        + "\"violations\":["
        + "{\"beginline\":1,"
        + "\"begincolumn\":8,"
        + "\"endline\":38,"
        + "\"endcolumn\":1,"
        + "\"description\":\"The class 'Property' is suspected to be a Data Class (WOC=11.111%, NOPA=0, NOAM=6, WMC=9)\","
        + "\"rule\":\"DataClass\","
        + "\"ruleset\":\"Design\","
        + "\"priority\":3,"
        + "\"externalInfoUrl\":\"" + PMD_RULES_URL + "#dataclass\"}]}],"
        + "\"suppressedViolations\":[],"
        + "\"processingErrors\":[],"
        + "\"configurationErrors\":[]}";
  }

}
