var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
import Icon from "../Icon/Icon";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
var SubMenu = function (props) {
    var _a = useState(false), open = _a[0], setOpen = _a[1]; //控制开关
    var index = props.index, title = props.title, className = props.className, children = props.children, _b = props.displayName, displayName = _b === void 0 ? "SubMenu" : _b;
    var context = useContext(MenuContext);
    var classes = classNames("menu-item submenu-item", className, {
        "is-active": context.index === index,
        "is-opened": open,
        "is-vertical": context.mode === "vertical",
    });
    var handleClick = function (e) {
        //纵向时点击控制
        e.preventDefault();
        setOpen(!open);
    };
    var timer; //开闭更圆滑，防抖
    var handleMouse = function (e, toggle) {
        //横向时hover控制
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvents = context.mode === "vertical"
        ? {
            //纵向时点击控制
            onClick: handleClick,
        }
        : {};
    var hoverEvents = context.mode !== "vertical"
        ? {
            //横向时hover控制
            onMouseEnter: function (e) {
                handleMouse(e, true);
            },
            onMouseLeave: function (e) {
                handleMouse(e, false);
            },
        }
        : {};
    var renderChildren = function () {
        var subMenuClasses = classNames("viking-submenu", {
            "menu-opened": open,
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child; //类型断言
            if (childElement.type.displayName === "MenuItem") {
                //SubMenu的子节点只能是MenuItem
                return React.cloneElement(childElement, { index: index + "-" + i }); //2-0
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
        return React.createElement("ul", { className: subMenuClasses }, childrenComponent);
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvents),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvents),
            title,
            React.createElement(Icon, { icon: "angle-down", className: "arrow-icon" })),
        renderChildren()));
};
SubMenu.defaultProps = { displayName: "SubMenu" };
SubMenu.displayName = "SubMenu";
export default SubMenu;
