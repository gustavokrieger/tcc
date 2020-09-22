import React from 'react';
import {default as WrappedComponent} from '@material-ui/core/CircularProgress';

type Props = {
  className?: string;
};

export default function CircularProgress(props: Props) {
  return <WrappedComponent className={props.className} />;
}
