import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
import { MenuItemProps } from "./MenuItem";
import Icon from "../Icon/Icon";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export interface SubMenuProps {
  displayName?: "SubMenu";
  index?: string;
  title: string;
  className?: string;
}
const SubMenu: React.FC<SubMenuProps> = (props) => {
  const [open, setOpen] = useState(false); //控制开关
  const { index, title, className, children, displayName = "SubMenu" } = props;
  const context = useContext(MenuContext);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "is-opened": open,
    "is-vertical": context.mode === "vertical",
  });
  const handleClick = (e: React.MouseEvent) => {
    //纵向时点击控制
    e.preventDefault();
    setOpen(!open);
  };
  let timer: any; //开闭更圆滑，防抖
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    //横向时hover控制
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };
  const clickEvents =
    context.mode === "vertical"
      ? {
          //纵向时点击控制
          onClick: handleClick,
        }
      : {};
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          //横向时hover控制
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};
  const renderChildren = () => {
    const subMenuClasses = classNames("viking-submenu", {
      "menu-opened": open, //通过display:none|block来控制
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>; //类型断言
      if (childElement.type.displayName === "MenuItem") {
        //SubMenu的子节点只能是MenuItem
        return React.cloneElement(childElement, { index: `${index}-${i}` }); //2-0
      } else {
        console.error(
          "Warning: Menu has a child which is not a MenuItem component"
        );
      }
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};
SubMenu.defaultProps = { displayName: "SubMenu" };
SubMenu.displayName = "SubMenu";
export default SubMenu;
