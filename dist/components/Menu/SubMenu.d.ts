import React from "react";
export interface SubMenuProps {
    displayName?: "SubMenu";
    index?: string;
    title: string;
    className?: string;
}
declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
