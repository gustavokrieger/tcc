import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 275,
    },
    cardContent: {
      '&:last-child': {
        paddingBottom: theme.spacing(2),
      },
    },
  })
);

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SimpleCard(props: Props) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, props.className)} elevation={3}>
      <CardContent className={classes.cardContent}>
        {props.children}
      </CardContent>
    </Card>
  );
}
