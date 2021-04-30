import { FC } from "react";
import Menu, { MenuProps as RMenuProps } from "./Menu";
import MenuItem, { MenuItemProps as RMenuItemProps } from "./MenuItem";
import SubMenu, { SubMenuProps as RSubMenuProps } from "./SubMenu";

export type IMenuComponent = FC<RMenuProps> & {
  Item: FC<RMenuItemProps>;
  SubMenu: FC<RSubMenuProps>;
};

export interface MenuProps extends RMenuProps {}
export interface MenuItemProps extends RMenuItemProps {}
export interface SubMenuProps extends RSubMenuProps {}

//断言
const TransMenu = Menu as IMenuComponent;

TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;
