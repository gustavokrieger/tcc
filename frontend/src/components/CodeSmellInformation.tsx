import Typography from '@material-ui/core/Typography';
import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      textAlign: 'center',
      flexDirection: 'column',
      maxWidth: '45%',
      fontSize: theme.typography.fontSize + 4,
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(5),
    },
    question: {
      fontSize: 'inherit',
      fontStyle: 'italic',
      color: theme.palette.text.secondary,
    },
    answer: {
      fontSize: 'inherit',
    },
  })
);

export default function CodeSmellInformation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
