import React, {useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import SimpleCard from './SimpleCard';
import Typography from '@material-ui/core/Typography';
import JavaCode, {JavaCodeProps} from './JavaCode';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {DialogTitle} from './DialogTitle';
import MouseOverPopover from './MouseOverPopover';
import {createStyles, Theme} from '@material-ui/core/styles';
import StorageItemCreator from '../../storage_items/StorageItemCreator';
import {BooleanValue} from '../../storage_items/BooleanValue';
import OpenButton from './OpenButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogTitle: {
      paddingBottom: 0,
    },
    dialogPaper: {
      minHeight: '93vh',
      maxHeight: '93vh',
      minWidth: '75vw',
      maxWidth: '75vw',
    },
    contentWithText: {
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      paddingTop: 0,
      paddingBottom: 0,
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
      maxWidth: '70.4%',
      overflow: 'auto',
      marginRight: theme.spacing(0.8),
    },
    descriptionCard: {
      maxWidth: '28.7%',
      maxHeight: '67.66vh',
      textAlign: 'center',
      overflowY: 'auto',
      marginLeft: theme.spacing(0.8),
    },
    fileNamePopover: {
      display: 'flex',
      maxWidth: '50.19vw',
      overflowWrap: 'break-word',
      wordBreak: 'break-all',
      minHeight: '4vh',
      alignItems: 'center',
    },
    compressedFileName: {
      maxWidth: '51vw',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textDecoration: 'underline',
      color: theme.palette.text.secondary,
    },
    firstTextHighlight: {
      color: '#D50000',
    },
    secondTextHighlight: {
      color: '#00C853',
    },
  })
);

export type ViolationCaseProps = {
  id: string;
  title: string;
  fileName: string;
  javaCodeProps: JavaCodeProps;
  description: string;
};

export default function ViolationCase(props: ViolationCaseProps) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [visited] = useState(
    StorageItemCreator.createVisitedViolationCase(props.id)
  );
  const [compressedFileName, setCompressedFileName] = useState('');
  const [formattedDescription, setFormattedDescription] = useState(<></>);

  useEffect(() => {
    if (open) {
      visited.setValue(BooleanValue.TRUE);
    }
  }, [open, visited]);

  useEffect(() => {
    function getCompressedFileName() {
      const fileNameParts = props.fileName.split('/');
      return '.../' + fileNameParts[fileNameParts.length - 1];
    }
    setCompressedFileName(getCompressedFileName());
  }, [props.fileName]);

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
      <OpenButton
        visited={visited.currentOrDefaultIs(BooleanValue.TRUE)}
        onClick={handleClickOpen}
      >
        {props.title}
      </OpenButton>
      <Dialog
        classes={{paper: classes.dialogPaper}}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          className={classes.dialogTitle}
          id="alert-dialog-slide-title"
          onClose={handleClose}
        >
          {props.title}
        </DialogTitle>
        <DialogContent className={classes.contentWithText}>
          <MouseOverPopover
            trigger={compressedFileName}
            triggerClassName={classes.compressedFileName}
          >
            <Typography className={classes.fileNamePopover}>
              {props.fileName}
            </Typography>
          </MouseOverPopover>
        </DialogContent>
        <DialogContent className={classes.contentWithCards}>
          <SimpleCard className={classes.codeCard}>
            <JavaCode {...props.javaCodeProps}>
              {props.javaCodeProps.children}
            </JavaCode>
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
