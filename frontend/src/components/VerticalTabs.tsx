import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // todo trocar para ser por props
  const elements = [
    {
      label: 'zero',
      values: ['zero_value', 'one_value'],
    },
    {
      label: 'one',
      values: ['two_value', 'three_value'],
    },
  ];

  const labels = [];

  for (let i = 0; i < elements.length; i++) {
    const label = elements[i].label;
    labels.push(<Tab label={label} {...a11yProps(i)} />);
  }

  const tabPanelValues = [];

  // todo fazer esses elementos se alinharem horizontalmente
  for (let i = 0; i < elements.length; i++) {
    const values = elements[i].values;
    for (const entry of values) {
      tabPanelValues.push(
        <TabPanel value={value} index={i}>
          {entry}
        </TabPanel>
      );
    }
  }

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {labels}
      </Tabs>
      {tabPanelValues}
    </div>
  );
}
