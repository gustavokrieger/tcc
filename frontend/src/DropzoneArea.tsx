import React from 'react';
import {DropzoneArea as WrappedComponent} from 'material-ui-dropzone';

type Props = {
  onDrop: (files: File[]) => void;
  acceptedFiles: string[];
};

export default function DropzoneArea(props: Props) {
  return <WrappedComponent {...props} />;
}
