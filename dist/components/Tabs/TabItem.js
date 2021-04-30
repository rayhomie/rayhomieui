import React, { useContext } from "react";
import classNames from "classnames";
import { TabsContext } from "./Tabs";
var TabItem = function (props) {
    var style = props.style, labal = props.labal, index = props.index, disabled = props.disabled, className = props.className, children = props.children;
    var context = useContext(TabsContext); //使用共享的context
    var classes = classNames("tab-item", className, {
        "is-disabled": disabled,
        "is-active": context.index === index,
        "tab-card": context.type === "card",
        "tab-line": context.type === "line",
    });
    var contentClasses = classNames("tab-content", {
        "tab-content-show": context.index === index,
    });
    var handleClick = function () {
        //点击li触发onSelect方法并传递相应index给父组件
        if (context.onSelect && !disabled && typeof index === "number")
            context.onSelect(index);
    };
    return (React.createElement("div", null,
        React.createElement("li", { className: classes, style: style, onClick: handleClick },
            React.createElement("div", null, labal)),
        React.createElement("div", { className: contentClasses }, children)));
};
TabItem.defaultProps = { displayName: "TabItem" };
TabItem.displayName = "TabItem";
export default TabItem;
