import React, { useState, createContext } from "react";
import classNames from "classnames";
//导出创建的context供子组件使用且提供默认值
export var MenuContext = createContext({ index: "0" });
var Menu = function (props) {
    var defaultIndex = props.defaultIndex, mode = props.mode, children = props.children, className = props.className, style = props.style, onSelect = props.onSelect;
    //使用context所有的状态都由父组件进行控制
    var _a = useState(defaultIndex), Active = _a[0], setActive = _a[1]; //由父组件进行所有状态的维护
    var classes = classNames("menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode !== "vertical",
    });
    var handleClick = function (index) {
        setActive(index); //维护状态改变
        if (onSelect)
            onSelect(index); //执行用户自定义传入的方法
    };
    //初始化需要共享的状态和修改的方法
    var passedContext = {
        index: Active || "0",
        onSelect: handleClick,
        mode: mode,
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child; //类型断言
            var displayName = childElement.props.displayName; //取出child的displayName
            if (displayName === "MenuItem" || displayName === "SubMenu") {
                return React.cloneElement(childElement, { index: index.toString() });
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: "0",
    mode: "horizontal",
};
export default Menu;
