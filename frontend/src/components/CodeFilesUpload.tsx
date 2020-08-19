import React from 'react';
import DropzoneArea from './DropzoneArea';
import CodeAnalysis from '../CodeAnalysis';

type Props = {
  onDrop: () => void;
};

export default function CodeFilesUpload(props: Props) {
  async function handleDrop(files: File[]) {
    props.onDrop();
    const codeAnalysis = new CodeAnalysis();
    await codeAnalysis.run(files);
  }

  return (
    <div className="code-files-upload">
      <DropzoneArea onDrop={handleDrop} acceptedFiles={['.java']} />
    </div>
  );
}
