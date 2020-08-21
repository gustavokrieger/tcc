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

type VerticalTabsProps = {
  elements: Element[];
};

type Element = {
  label: string;
  values: any[];
};

export default function VerticalTabs(props: VerticalTabsProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // todo melhorar
  function getLabels() {
    const labels = [];
    const elements = props.elements;

    for (let i = 0; i < elements.length; i++) {
      labels.push(getIndexedTab(elements[i], i));
    }

    return labels;
  }

  function getIndexedTab(element: Element, index: number) {
    const label = element.label;
    return <Tab label={label} {...a11yProps(index)} />;
  }

  // todo melhorar
  function getTabPanelValues() {
    const tabPanelValues = [];

    // todo fazer esses elementos se alinharem horizontalmente
    for (let i = 0; i < props.elements.length; i++) {
      const values = props.elements[i].values;
      for (const entry of values) {
        tabPanelValues.push(
          <TabPanel value={value} index={i}>
            {entry}
          </TabPanel>
        );
      }
    }

    return tabPanelValues;
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
        {getLabels()}
      </Tabs>
      {getTabPanelValues()}
    </div>
  );
}
