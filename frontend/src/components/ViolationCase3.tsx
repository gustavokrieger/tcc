import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import SimpleCard from './SimpleCard';
import {makeStyles} from '@material-ui/core/styles';

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
    height: '780px',
    width: '65%',
    overflow: 'auto',
  },
  descriptionCard: {
    width: '32%',
    height: '200px',
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
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join('\n')}
          </SimpleCard>
          <SimpleCard className={classes.descriptionCard}>alo2</SimpleCard>
        </DialogContent>
      </Dialog>
    </div>
  );
}
