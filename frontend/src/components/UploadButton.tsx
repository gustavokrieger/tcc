import React, {ChangeEvent} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  })
);

type Props = {
  children: React.ReactNode;
  className?: string;
  accept: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function UploadButton(props: Props) {
  const classes = useStyles();
  const rootClassName =
    props.className !== undefined ? props.className : classes.root;

  return (
    <div className={rootClassName}>
      <input
        accept={props.accept}
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={props.onChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          {props.children}
        </Button>
      </label>
    </div>
  );
}
