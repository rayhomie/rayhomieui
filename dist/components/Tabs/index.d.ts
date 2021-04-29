import { FC } from "react";
import { TabItemProps } from "./TabItem";
import { TabsProps } from "./Tabs";
export interface ITabsComponent extends FC<TabsProps> {
    Item: FC<TabItemProps>;
}
declare const TransTabs: ITabsComponent;
export default TransTabs;
