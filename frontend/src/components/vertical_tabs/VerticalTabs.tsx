import React, {useEffect, useState} from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export type Props = {
  className?: string;
  tabs: Tab[];
};

export type Tab = {
  label: string;
  children: React.ReactNode[];
};

export default function VerticalTabs(props: Props) {
  const classes = useStyles();

  const [currentTab, setCurrentTab] = useState(0);
  const [tabsChildren, setTabsChildren] = useState<JSX.Element[]>([]);
  const [tabPanel, setTabPanel] = useState<JSX.Element>(<></>);

  useEffect(() => {
    const newTabsChildren: JSX.Element[] = [];
    props.tabs.forEach((tab, index) => {
      newTabsChildren.push(
        <Tab key={index} label={tab.label} {...a11yProps(index)} />
      );
    });
    setTabsChildren(newTabsChildren);
  }, [props.tabs]);

  useEffect(() => {
    const tab = props.tabs[currentTab];
    const newTabPanel = (
      <TabPanel value={currentTab} index={currentTab}>
        {tab.children}
      </TabPanel>
    );
    setTabPanel(newTabPanel);
  }, [props.tabs, currentTab]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <div className={clsx(classes.root, props.className)}>
      <Tabs
        className={classes.tabs}
        orientation="vertical"
        variant="scrollable"
        value={currentTab}
        onChange={handleChange}
        aria-label="Vertical tabs"
      >
        {tabsChildren}
      </Tabs>
      {tabPanel}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
