import React from "react";
export interface MenuItemProps {
    displayName?: "MenuItem";
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
