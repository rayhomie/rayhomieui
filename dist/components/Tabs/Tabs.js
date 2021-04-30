import React, { createContext, useState } from "react";
import classNames from "classnames";
export var TabsContext = createContext({ index: 0 });
var Tabs = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, onSelect = props.onSelect, type = props.type, style = props.style, children = props.children;
    var _a = useState(defaultIndex), Active = _a[0], setActive = _a[1]; //由父组件进行所有状态的维护
    var classes = classNames("tabs", "tab-content-main", className, {
        "tabs-line": type === "line",
        "tabs-card": type === "card",
    });
    var handleClick = function (index) {
        setActive(index); //维护状态改变
        if (onSelect)
            onSelect(index); //执行用户自定义传入的方法
    };
    var passedContext = {
        index: Active || 0,
        onSelect: handleClick,
        type: type,
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child; //类型断言
            var displayName = childElement.props.displayName; //取出child的displayName
            if (displayName === "TabItem") {
                return React.cloneElement(childElement, { index: index });
            }
            else {
                console.error("Warning: Tabs has a child which is not a Tabs.Item component");
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style },
        React.createElement(TabsContext.Provider, { value: passedContext }, renderChildren())));
};
Tabs.defaultProps = {
    defaultIndex: 0,
    type: "line",
};
export default Tabs;
