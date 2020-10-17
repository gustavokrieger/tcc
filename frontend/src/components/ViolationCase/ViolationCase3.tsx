import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import SimpleCard from './SimpleCard';
import Typography from '@material-ui/core/Typography';
import JavaCode, {JavaCodeProps} from './JavaCode';
import DialogContentText from '@material-ui/core/DialogContentText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  title: {
    textTransform: 'uppercase',
  },
  dialogPaper: {
    minHeight: '93vh',
    maxHeight: '93vh',
    minWidth: '75vw',
    maxWidth: '75vw',
  },
  contentWithText: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    height: '1vh',
    width: '68%',
  },
  contentWithCards: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  codeCard: {
    display: 'flex',
    height: '79.6vh',
    width: '69.2%',
    overflow: 'auto',
  },
  descriptionCard: {
    width: '29.5%',
    maxHeight: '39.8vh',
    textAlign: 'center',
    overflowY: 'auto',
  },
});

export type ViolationCaseProps = {
  title: string;
  fileName: string;
  javaCodeProps: JavaCodeProps;
  description: string;
};

export default function ViolationCase3(props: ViolationCaseProps) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {props.title}
      </Button>
      <Dialog
        classes={{paper: classes.dialogPaper}}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className={classes.title} id="alert-dialog-slide-title">
          {props.title}
        </DialogTitle>
        <DialogContent className={classes.contentWithText}>
          <DialogContentText id="alert-dialog-slide-description">
            {props.fileName}
          </DialogContentText>
        </DialogContent>
        <DialogContent className={classes.contentWithCards}>
          <SimpleCard className={classes.codeCard}>
            <JavaCode {...props.javaCodeProps} />
          </SimpleCard>
          <SimpleCard className={classes.descriptionCard}>
            <Typography>{props.description}</Typography>
          </SimpleCard>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const Transition = React.forwardRef(
  (
    props: TransitionProps & {children?: React.ReactElement<any, any>},
    ref: React.Ref<unknown>
  ) => {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);
