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
  entries: Entry[];
};

type Entry = {
  label: string;
  elements: JSX.Element[];
};

export default function VerticalTabs(props: VerticalTabsProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  function getTabs(): JSX.Element[] {
    const number_of_entries = props.entries.length;
    const tabs: JSX.Element[] = [];
    for (let i = 0; i < number_of_entries; i++) {
      tabs.push(getTabFromEntry(i));
    }
    return tabs;
  }

  function getTabFromEntry(entry_index: number): JSX.Element {
    const label = props.entries[entry_index].label;
    return <Tab label={label} {...a11yProps(entry_index)} />;
  }

  function getTabPanels(): JSX.Element[] {
    const number_of_entries = props.entries.length;
    const tabPanels: JSX.Element[] = [];
    for (let i = 0; i < number_of_entries; i++) {
      tabPanels.concat(getTabPanelsFromEntry(i));
    }
    return tabPanels;
  }

  function getTabPanelsFromEntry(entry_index: number): JSX.Element[] {
    const elements = props.entries[entry_index].elements;
    const tabPanels: JSX.Element[] = [];
    for (const element of elements) {
      tabPanels.push(
        <TabPanel value={value} index={entry_index}>
          {element}
        </TabPanel>
      );
    }
    return tabPanels;
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
        {getTabs()}
      </Tabs>
      {getTabPanels()}
    </div>
  );
}
