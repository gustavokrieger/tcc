import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: theme.typography.fontSize + 3,
      margin: theme.spacing(2),
    },
  })
);

export default function StaticLoading() {
  const classes = useStyles();

  return (
    <Typography className={classes.root}>
      Aguarde enquanto os arquivos estão sendo processados...
    </Typography>
  );
}
