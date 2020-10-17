import React, {useState} from 'react';
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
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export type Props = {
  className?: string;
  tabs: Iterable<Tab>;
};

export type Tab = {
  label: string;
  children: React.ReactNode[];
};

export default function VerticalTabs(props: Props) {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const tabsChildren: JSX.Element[] = [];
  const tabPanels: JSX.Element[] = [];

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
    <div className={clsx(classes.root, props.className)}>
      <Tabs
        className={classes.tabs}
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
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
