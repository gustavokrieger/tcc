import React, {ChangeEvent} from 'react';
import UploadButton from './UploadButton';
import assert from 'assert';
import JavaFiles from '../../JavaFiles';
import {useHistory} from 'react-router-dom';
import CodeAnalysisResultUtility from '../../CodeAnalysisResultUtility';
import {Path} from '../../pages/Path';
import {CodeAnalysisResultNoCasesProps} from '../../pages/CodeAnalysisResultNoCases';

type Props = {
  className?: string;
  beforeChange?: () => void;
  afterChange?: () => void;
  children: React.ReactNode;
};

export default function UploadButtonToResultPage(props: Props) {
  const history = useHistory();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    beforeChange();
    assert(event.target.files !== null);
    const javaFiles = JavaFiles.fromListRemovingNonJava(event.target.files);
    if (javaFiles.isEmpty()) {
      afterChange();
      const nextPageProps: CodeAnalysisResultNoCasesProps = {
        text: 'Nenhum arquivo Java encontrado...',
      };
      history.push(Path.CODE_ANALYSIS_RESULT_NO_CASES, nextPageProps);
      return;
    }
    CodeAnalysisResultUtility.convertFilesToProps(javaFiles).then(
      nextPageProps => {
        afterChange();
        history.push(Path.CODE_ANALYSIS_RESULT, nextPageProps);
      }
    );
  }

  function beforeChange() {
    if (props.beforeChange !== undefined) {
      props.beforeChange();
    }
  }

  function afterChange() {
    if (props.afterChange !== undefined) {
      props.afterChange();
    }
  }

  return (
    <UploadButton className={props.className} onChange={handleChange}>
      {props.children}
    </UploadButton>
  );
}
