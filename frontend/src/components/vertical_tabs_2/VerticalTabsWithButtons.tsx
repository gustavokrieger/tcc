import * as React from 'react';
import VerticalTabs2, {Props, Tab} from './VerticalTabs2';
import {Button} from '@material-ui/core';

export default function VerticalTabsWithButtons(props: Props) {
  function* buttons() {
    for (const tab of props.tabs) {
      const modifiedTab: Tab = {
        ...tab,
        children: <Button>{tab.children}</Button>,
      };
      yield modifiedTab;
    }
  }
  return <VerticalTabs2 tabs={buttons()} />;
}
