import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var context = useContext(MenuContext); //使用共享的context
    var classes = classNames("menu-item", className, {
        "is-disabled": disabled,
        "is-active": context.index === index,
    });
    var handleClick = function () {
        //点击li触发onSelect方法并传递相应index给父组件
        if (context.onSelect && !disabled && typeof index === "string")
            context.onSelect(index);
    };
    return (React.createElement("li", { className: classes, style: style, onClick: handleClick }, children));
};
MenuItem.defaultProps = { displayName: "MenuItem" };
MenuItem.displayName = "MenuItem"; //添加displayName标记
export default MenuItem;
