import { IReportTabs, ITab, ITabPanelProps } from 'constant';

import { Tab, Tabs } from '@mui/material';

import './reportTab-styles.scss';

const TabPanel = (props: ITabPanelProps) => {
  const { children, value, index } = props;
  return value === index ? children : null;
};

const ReportTab = (props: IReportTabs) => {
  const { tabs, onTabClick, currentTab } = props;

  const renderTab = () => {
    return tabs.map(({ title }: ITab) => (
      <Tab label={title} key={title} className="report-tab__tab" />
    ));
  };

  const renderTabPanels = () => {
    return tabs.map(({ component, title }: ITab, index: number) => (
      <TabPanel index={index} value={currentTab} key={title}>
        {component}
      </TabPanel>
    ));
  };

  return (
    <>
      <Tabs
        value={currentTab}
        onChange={onTabClick}
        className="report-tab"
        TabIndicatorProps={{
          className: 'report-tab__tab-indicator',
        }}>
        {renderTab()}
      </Tabs>
      {renderTabPanels()}
    </>
  );
};

export default ReportTab;
