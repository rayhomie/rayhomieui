import React from "react";
import classNames from "classnames";
// import { CSSTransition } from 'react-transition-group';
import Transition from "../Transition/Transition";
import Icon from "../Icon/Icon";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
export var AlertType;
(function (AlertType) {
    AlertType["Default"] = "default";
    AlertType["Success"] = "success";
    AlertType["Danger"] = "danger";
    AlertType["Warning"] = "warning";
})(AlertType || (AlertType = {}));
var Alert = function (props) {
    var _a;
    var className = props.className, alertType = props.alertType, title = props.title, description = props.description, closeable = props.closeable, onClose = props.onClose, visible = props.visible;
    var classes = classNames("alt", className, (_a = {},
        _a["alt-" + alertType] = alertType,
        _a));
    var closeIconClasses = classNames({
        "alt-close": closeable,
    });
    var onclose = onClose; //类型断言
    return (React.createElement(React.Fragment, null,
        React.createElement(Transition, { in: visible, animation: "zoom-in-left", timeout: 400 },
            React.createElement("div", { className: classes },
                React.createElement("span", { className: "alt-title" }, title),
                React.createElement("p", { className: "alt-description" }, description),
                React.createElement("span", { className: closeIconClasses || "alt-close-none" },
                    React.createElement(Icon, { icon: "window-close", size: "1x", onClick: function () {
                            onclose();
                        } }))))));
};
Alert.defaultProps = {
    closeable: true,
    alertType: "default",
    onClose: function () { },
};
export default Alert;
