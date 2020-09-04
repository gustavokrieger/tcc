import React from 'react';
import {RouteComponentProps, useParams} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

type Params = {
  title: string;
};

type Props = {
  code: string;
};

export default function ViolationCase(
  props: RouteComponentProps<{}, any, Props | any> // "any" is a Workaround.
) {
  const {title} = useParams<Params>();
  const code: string = props.location.state.code;

  return (
    <div className="violation-case">
      <Typography variant="h3">{title}</Typography>
      <Typography variant="body1">{code}</Typography>
    </div>
  );
}
