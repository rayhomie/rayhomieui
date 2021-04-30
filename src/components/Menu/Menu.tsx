import React, { useState, createContext } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./MenuItem";

type MenuMode = "horizontal" | "vertical";
type selectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  //定义组件props类型
  defaultIndex?: string; //默认被选中的索引值（默认0）
  mode?: MenuMode; //横向|纵向（默认横向）
  onSelect?: selectCallback; //点击选择之后的触发的函数
  className?: string; //用户自定义的传入的class
  style?: React.CSSProperties; //用户自定义组件的style传递给ul
}

interface MenuContext {
  //定义context传递类型，子父组件间传值
  index: string;
  onSelect?: selectCallback;
  mode?: MenuMode;
}
//导出创建的context供子组件使用且提供默认值
export const MenuContext = createContext<MenuContext>({ index: "0" });

const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, mode, children, className, style, onSelect } = props;
  //使用context所有的状态都由父组件进行控制
  const [Active, setActive] = useState(defaultIndex); //由父组件进行所有状态的维护
  const classes = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });
  const handleClick = (index: string) => {
    setActive(index); //维护状态改变
    if (onSelect) onSelect(index); //执行用户自定义传入的方法
  };
  //初始化需要共享的状态和修改的方法
  const passedContext: MenuContext = {
    index: Active || "0", //将状态共享
    onSelect: handleClick, //将函数共享
    mode,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>; //类型断言
      const { displayName } = childElement.props; //取出child的displayName
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(childElement, { index: index.toString() });
      } else {
        console.error(
          "Warning: Menu has a child which is not a MenuItem component"
        );
      }
    });
  };
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {/*提供者*/}
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};
Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
};
export default Menu;
