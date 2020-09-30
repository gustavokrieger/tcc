import React from 'react';
import clsx from 'clsx';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Entry} from './entry';
import Entries from './Entries';

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
  className?: string;
  entries: Entries;
};

export default function VerticalTabs(props: VerticalTabsProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const tabs = props.entries.innerEntries.map((entry, index) => (
    <Tab key={entry.label} label={entry.label} {...a11yProps(index)} />
  ));

  const tabPanels = props.entries.innerEntries.map(getTabPanelsFromEntry);

  function getTabPanelsFromEntry(
    entry: Entry,
    entry_index: number
  ): JSX.Element[] {
    const panels: JSX.Element[] = [];
    for (const element of entry.elements) {
      panels.push(getTabPanelFromElement(element, entry.label, entry_index));
    }
    return panels;
  }

  function getTabPanelFromElement(
    element: JSX.Element,
    entry_label: string,
    entry_index: number
  ): JSX.Element {
    const key = entry_label + element.props.children;
    return (
      <TabPanel key={key} value={value} index={entry_index}>
        {element}
      </TabPanel>
    );
  }

  return (
    <div className={clsx(classes.root, props.className)}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {tabs}
      </Tabs>
      {tabPanels}
    </div>
  );
}
