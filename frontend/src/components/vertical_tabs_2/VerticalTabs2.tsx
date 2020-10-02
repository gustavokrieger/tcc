import React from 'react';
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

type Props = {
  tabs: Tab[];
};

export default function VerticalTabs2(props: Props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const tabsChildren: JSX.Element[] = [];
  const tabPanels: JSX.Element[] = [];

  props.tabs.forEach((tab, index) => {
    tabsChildren.push(
      <Tab key={index} label={tab.label} {...a11yProps(index)} />
    );

    tabPanels.push(
      <TabPanel key={index} value={value} index={index}>
        {tab.children}
      </TabPanel>
    );
  });

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
