import React from 'react';
import {Light as SyntaxHighlighter} from 'react-syntax-highlighter';
import java from 'react-syntax-highlighter/dist/esm/languages/hljs/java';
import {githubGist} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

SyntaxHighlighter.registerLanguage('java', java);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      minWidth: '49.4vw',
    },
    code: {
      fontSize: theme.typography.fontSize + 3,
    },
  })
);

export type JavaCodeProps = {
  children: string;
  startingLineNumber: number;
  lineMarkStart: number;
  lineMarkEnd: number;
};

export default function JavaCode(props: JavaCodeProps) {
  const classes = useStyles();

  return (
    <SyntaxHighlighter
      className={classes.root}
      codeTagProps={{className: classes.code}}
      language="java"
      style={githubGist}
      showLineNumbers
      wrapLines
      startingLineNumber={props.startingLineNumber}
      lineProps={lineNumber => {
        const style = {display: 'block', backgroundColor: ''};
        if (
          lineNumber >= props.lineMarkStart &&
          lineNumber <= props.lineMarkEnd
        ) {
          style.backgroundColor = '#fff5b1';
        }
        return {style};
      }}
    >
      {props.children}
    </SyntaxHighlighter>
  );
}
