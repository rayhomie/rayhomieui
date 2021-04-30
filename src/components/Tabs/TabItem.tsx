import React, { useContext } from "react";
import classNames from "classnames";
import { TabsContext } from "./Tabs";

export interface TabItemProps {
  displayName?: "TabItem";
  index?: number; //每个item不用的索引值
  disabled?: boolean; //是否可用
  className?: string;
  style?: React.CSSProperties;
  labal: any; //表题
}

const TabItem: React.FC<TabItemProps> = (props) => {
  const {
    style,
    labal,
    index,
    disabled,
    className,
    children,
    displayName = "TabItem",
  } = props;
  const context = useContext(TabsContext); //使用共享的context
  const classes = classNames("tab-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
    "tab-card": context.type === "card",
    "tab-line": context.type === "line",
  });
  const contentClasses = classNames("tab-content", {
    "tab-content-show": context.index === index,
  });
  const handleClick = () => {
    //点击li触发onSelect方法并传递相应index给父组件
    if (context.onSelect && !disabled && typeof index === "number")
      context.onSelect(index);
  };
  return (
    <div>
      <li className={classes} style={style} onClick={handleClick}>
        <div>{labal}</div>
      </li>
      <div className={contentClasses}>{children}</div>
    </div>
  );
};
TabItem.defaultProps = { displayName: "TabItem" };
TabItem.displayName = "TabItem";
export default TabItem;
