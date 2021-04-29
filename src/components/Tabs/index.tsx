import { FC } from "react";
import TabItem, { TabItemProps } from "./TabItem";
import Tabs, { TabsProps } from "./Tabs";

export interface ITabsComponent extends FC<TabsProps> {
  Item: FC<TabItemProps>;
}
const TransTabs = Tabs as ITabsComponent;
TransTabs.Item = TabItem;

export default TransTabs;
