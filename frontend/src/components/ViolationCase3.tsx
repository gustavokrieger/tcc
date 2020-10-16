import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import SimpleCard from './SimpleCard';
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import JavaCode from './JavaCode';

const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '90vh',
    maxHeight: '90vh',
    minWidth: '75vw',
    maxWidth: '75vw',
  },
  dialogContent: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  codeCard: {
    display: 'flex',
    height: '776px',
    width: '69.2%',
    overflow: 'auto',
  },
  descriptionCard: {
    width: '29.5%',
    maxHeight: '388px',
    textAlign: 'center',
    overflowY: 'auto',
  },
});

const Transition = React.forwardRef(
  (
    props: TransitionProps & {children?: React.ReactElement<any, any>},
    ref: React.Ref<unknown>
  ) => {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

export default function ViolationCase3() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        classes={{paper: classes.dialogPaper}}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <SimpleCard className={classes.codeCard}>
            <JavaCode />
          </SimpleCard>
          <SimpleCard className={classes.descriptionCard}>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </Typography>
          </SimpleCard>
        </DialogContent>
      </Dialog>
    </div>
  );
}
