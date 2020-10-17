import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SimpleCard(props: Props) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, props.className)} elevation={3}>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}
