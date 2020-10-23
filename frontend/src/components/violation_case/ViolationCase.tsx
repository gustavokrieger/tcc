import React, {useEffect, useState} from 'react';
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
  button: {
    marginBottom: '1vh',
  },
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
    width: '70.4%',
    overflow: 'auto',
  },
  descriptionCard: {
    width: '28.7%',
    maxHeight: '47.76vh',
    textAlign: 'center',
    overflowY: 'auto',
  },
  firstTextHighlight: {
    color: '#D50000',
  },
  secondTextHighlight: {
    color: '#00C853',
  },
});

export type ViolationCaseProps = {
  title: string;
  fileName: string;
  javaCodeProps: JavaCodeProps;
  description: string;
};

export default function ViolationCase(props: ViolationCaseProps) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [formattedDescription, setFormattedDescription] = useState(<></>);

  useEffect(() => {
    function getFormattedDescription() {
      const firstPartToHighlight = 'O problema';
      const [firstPart, remainingText] = props.description.split(
        firstPartToHighlight
      );
      const secondTextToHighlight = 'A solução';
      const [secondPart, thirdPart] = remainingText.split(
        secondTextToHighlight
      );

      const firstParagraph = <Typography>{firstPart}</Typography>;
      const secondParagraph = (
        <Typography>
          <span className={classes.firstTextHighlight}>
            {firstPartToHighlight}
          </span>
          {secondPart}
        </Typography>
      );
      const thirdParagraph = (
        <Typography>
          <span className={classes.secondTextHighlight}>
            {secondTextToHighlight}
          </span>
          {thirdPart}
        </Typography>
      );
      return (
        <>
          {firstParagraph}
          {secondParagraph}
          {thirdParagraph}
        </>
      );
    }
    setFormattedDescription(getFormattedDescription());
  }, [
    props.description,
    classes.firstTextHighlight,
    classes.secondTextHighlight,
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
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
            {formattedDescription}
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
