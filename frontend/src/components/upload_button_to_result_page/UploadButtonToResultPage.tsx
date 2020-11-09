import React, {ChangeEvent} from 'react';
import UploadButton from './UploadButton';
import assert from 'assert';
import JavaFiles from '../../JavaFiles';
import {useHistory} from 'react-router-dom';
import CodeAnalysisResultUtility from '../../CodeAnalysisResultUtility';
import {Path} from '../../pages/Path';

type Props = {
  beforeChange: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function UploadButtonToResultPage(props: Props) {
  const history = useHistory();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    props.beforeChange();
    assert(event.target.files !== null);
    const javaFiles = JavaFiles.fromListRemovingNonJava(event.target.files);
    // todo criar tela para isso
    if (javaFiles.isEmpty()) {
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
