import React from "react";
declare type TabsType = "line" | "card";
declare type selectCallback = (selectedIndex: number) => void;
export interface TabsProps {
    defaultIndex?: number;
    className?: string;
    onSelect?: selectCallback;
    type?: TabsType;
    style?: React.CSSProperties;
}
interface TabsContext {
    index: number;
    onSelect?: selectCallback;
    type?: TabsType;
}
export declare const TabsContext: React.Context<TabsContext>;
declare const Tabs: React.FC<TabsProps>;
export default Tabs;
