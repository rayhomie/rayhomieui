import { FC } from "react";
import { MenuProps as RMenuProps } from "./Menu";
import { MenuItemProps as RMenuItemProps } from "./MenuItem";
import { SubMenuProps as RSubMenuProps } from "./SubMenu";
export declare type IMenuComponent = FC<RMenuProps> & {
    Item: FC<RMenuItemProps>;
    SubMenu: FC<RSubMenuProps>;
};
export interface MenuProps extends RMenuProps {
}
export interface MenuItemProps extends RMenuItemProps {
}
export interface SubMenuProps extends RSubMenuProps {
}
declare const TransMenu: IMenuComponent;
export default TransMenu;
