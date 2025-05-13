import React from 'react';

type ITab = {
  component: React.ReactNode;
  title: string;
};

type IReportTabs = {
  currentTab: number;
  onTabClick: (event: React.SyntheticEvent, newValue: number) => void;
  tabs: Array<ITab>;
};

type ITabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export type { ITabPanelProps, IReportTabs, ITab };
