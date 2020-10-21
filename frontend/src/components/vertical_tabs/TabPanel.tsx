import React from 'react';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    overflow: 'auto',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
  },
});

interface Props {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export default function TabPanel(props: Props) {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      role="tabpanel"
      hidden={props.value !== props.index}
      id={`vertical-tabpanel-${props.index}`}
      aria-labelledby={`vertical-tab-${props.index}`}
    >
      {props.value === props.index && (
        <Box className={classes.box} p={3}>
          {props.children}
        </Box>
      )}
    </div>
  );
}
