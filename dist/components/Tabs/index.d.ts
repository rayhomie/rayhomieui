import { FC } from "react";
import { TabItemProps as RTabItemProps } from "./TabItem";
import { TabsProps as RTabsProps } from "./Tabs";
export interface ITabsComponent extends FC<RTabsProps> {
    Item: FC<RTabItemProps>;
}
export interface TabsProps extends RTabsProps {
}
export interface TabItemProps extends RTabItemProps {
}
declare const TransTabs: ITabsComponent;
export default TransTabs;
