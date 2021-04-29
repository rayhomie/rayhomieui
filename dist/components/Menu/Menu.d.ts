import React from "react";
declare type MenuMode = "horizontal" | "vertical";
declare type selectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    defaultIndex?: string;
    mode?: MenuMode;
    onSelect?: selectCallback;
    className?: string;
    style?: React.CSSProperties;
}
interface MenuContext {
    index: string;
    onSelect?: selectCallback;
    mode?: MenuMode;
}
export declare const MenuContext: React.Context<MenuContext>;
declare const Menu: React.FC<MenuProps>;
export default Menu;
