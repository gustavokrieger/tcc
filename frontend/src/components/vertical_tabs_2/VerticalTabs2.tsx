import React, {useState} from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel';

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

export type Tab = {
  label: string;
  children: React.ReactNode;
};

export type Props = {
  tabs: Iterable<Tab>;
};

export default function VerticalTabs2(props: Props) {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const [tabsChildren] = useState<JSX.Element[]>([]);
  const [tabPanels] = useState<JSX.Element[]>([]);

  let index = 0;
  for (const tab of props.tabs) {
    tabsChildren.push(
      <Tab key={index} label={tab.label} {...a11yProps(index)} />
    );

    tabPanels.push(
      <TabPanel key={index} value={value} index={index}>
        {tab.children}
      </TabPanel>
    );

    index++;
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

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
        {tabsChildren}
      </Tabs>
      {tabPanels}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
