import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import SimpleCard from './SimpleCard';
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';

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
    maxHeight: '390px',
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
            <Typography component="pre">
              {'package fibsandlies;\n' +
                '\n' +
                'import java.util.Map;\n' +
                'import java.util.HashMap;\n' +
                '\n' +
                'public class FibCalculator extends Fibonacci implements Calculator {\n' +
                '    private static Map<Integer, Integer> memoized = new HashMap<>();\n' +
                '\n' +
                '    public static void main(String[] args) {\n' +
                '        memoized.put(1, 1);\n' +
                '        memoized.put(2, 1);\n' +
                '        System.out.println(fibonacci(12)); // Get the 12th Fibonacci number and print to console\n' +
                '    }\n' +
                '\n' +
                '    public static int fibonacci(int fibIndex) {\n' +
                '        if (memoized.containsKey(fibIndex)) return memoized.get(fibIndex);\n' +
                '        else {\n' +
                '            int answer = fibonacci(fibIndex - 1) + fibonacci(fibIndex - 2);\n' +
                '            memoized.put(fibIndex, answer);\n' +
                '            return answer;\n' +
                '        }\n' +
                '    }\n' +
                '}'}
            </Typography>
          </SimpleCard>
          <SimpleCard className={classes.descriptionCard}>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </SimpleCard>
        </DialogContent>
      </Dialog>
    </div>
  );
}
