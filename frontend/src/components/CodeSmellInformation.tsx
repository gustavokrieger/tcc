import Typography from '@material-ui/core/Typography';
import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      textAlign: 'center',
      flexDirection: 'column',
      maxWidth: '45%',
      fontSize: theme.typography.fontSize + 4,
      marginBottom: theme.spacing(5),
      fontStyle: 'italic',
    },
    question: {
      fontSize: 'inherit',
      color: theme.palette.text.secondary,
    },
    answer: {
      fontSize: 'inherit',
    },
  })
);

type Props = {
  className?: string;
};

export default function CodeSmellInformation(props: Props) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      <Typography className={classes.question}>
        - O que é um code smell?
      </Typography>
      <Typography className={classes.answer}>
        Code smell é uma característica do código que pode indicar que ele é
        difícil de entender, reutilizar ou alterar.
      </Typography>
    </div>
  );
}
