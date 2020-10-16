import React from 'react';
import {Light as SyntaxHighlighter} from 'react-syntax-highlighter';
import java from 'react-syntax-highlighter/dist/esm/languages/hljs/java';
import {githubGist} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: '45vw',
  },
  code: {
    fontSize: '17px',
  },
});

SyntaxHighlighter.registerLanguage('java', java);

const linesToMark = [1, 2, 3, 4, 5];

export default function JavaCode() {
  const classes = useStyles();

  return (
    <SyntaxHighlighter
      className={classes.root}
      codeTagProps={{className: classes.code}}
      language="java"
      style={githubGist}
      showLineNumbers
      wrapLines
      startingLineNumber={1}
      lineProps={lineNumber => {
        const style = {display: 'block', backgroundColor: ''};
        if (linesToMark.includes(lineNumber)) {
          style.backgroundColor = '#fff5b1';
        }
        return {style};
      }}
    >
      {CODE}
    </SyntaxHighlighter>
  );
}

const CODE = `package fibsandlies;

import java.util.Map;
import java.util.HashMap;

public class FibCalculator extends Fibonacci implements Calculator {
  private static Map<Integer, Integer> memoized = new HashMap<>();

  public static void main(String[] args) {
    memoized.put(1, 1);
    memoized.put(2, 1);
    System.out.println(fibonacci(12)); // Get the 12th Fibonacci number and print to consoles
  }

  public static int fibonacci(int fibIndex) {
    if (memoized.containsKey(fibIndex)) return memoized.get(fibIndex);
    else {
        int answer = fibonacci(fibIndex - 1) + fibonacci(fibIndex - 2);
        memoized.put(fibIndex, answer);
        return answer;
    }
  }
}`;
