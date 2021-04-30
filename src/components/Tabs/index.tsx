import { FC } from "react";
import TabItem, { TabItemProps as RTabItemProps } from "./TabItem";
import Tabs, { TabsProps as RTabsProps } from "./Tabs";

export interface ITabsComponent extends FC<RTabsProps> {
  Item: FC<RTabItemProps>;
}

export interface TabsProps extends RTabsProps {}
export interface TabItemProps extends RTabItemProps {}

const TransTabs = Tabs as ITabsComponent;
TransTabs.Item = TabItem;

export default TransTabs;
