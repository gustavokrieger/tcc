import React from 'react';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {createStyles, Theme} from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(1),
      color: '#3f51b5',
      border: '1px solid rgba(63, 81, 181, 0.5)',
    },
    visited: {
      color: 'rgba(52, 0, 52, 0.85)',
      border: '1px solid rgba(52, 0, 52, 0.45)',
    },
  })
);

type Props = {
  children: React.ReactNode;
  visited: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function OpenButton(props: Props) {
  const classes = useStyles();

  return (
    <Button
      className={clsx(classes.root, {[classes.visited]: props.visited})}
      variant="outlined"
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}
