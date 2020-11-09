import React, {ChangeEvent} from 'react';
import UploadButton from './UploadButton';
import assert from 'assert';
import JavaFiles from '../../JavaFiles';
import {useHistory} from 'react-router-dom';
import CodeAnalysisResultUtility from '../../CodeAnalysisResultUtility';
import {Path} from '../../pages/Path';
import {CodeAnalysisResultNoCasesProps} from '../../pages/CodeAnalysisResultNoCases';

type Props = {
  beforeChange: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function UploadButtonToResultPage(props: Props) {
  const history = useHistory();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    props.beforeChange();
    // todo criar tela para isso
    assert(event.target.files !== null);
    const javaFiles = JavaFiles.fromListRemovingNonJava(event.target.files);
    if (javaFiles.isEmpty()) {
      const nextPageProps: CodeAnalysisResultNoCasesProps = {
        text: 'Nenhum arquivo Java encontrado...',
      };
      history.push(Path.CODE_ANALYSIS_RESULT_NO_CASES, nextPageProps);
      return;
    }
    CodeAnalysisResultUtility.convertFilesToProps(
      javaFiles
    ).then(nextPageProps =>
      history.push(Path.CODE_ANALYSIS_RESULT, nextPageProps)
    );
  }

  return (
    <UploadButton className={props.className} onChange={handleChange}>
      {props.children}
    </UploadButton>
  );
}
