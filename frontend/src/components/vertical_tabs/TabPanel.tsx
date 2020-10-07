import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

interface Props {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export default function TabPanel(props: Props) {
  return (
    <div
      role="tabpanel"
      hidden={props.value !== props.index}
      id={`vertical-tabpanel-${props.index}`}
      aria-labelledby={`vertical-tab-${props.index}`}
    >
      {props.value === props.index && (
        <Box p={3}>
          <Typography>{props.children}</Typography>
        </Box>
      )}
    </div>
  );
}
