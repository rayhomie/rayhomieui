import React, { useState, useEffect, useRef, useMemo } from "react";
import classnames from "classnames";
import Transition from "../Transition/Transition";
var Pagination = function (props) {
    var className = props.className, style = props.style, pageSize = props.pageSize, current = props.current, total = props.total, disabled = props.disabled, onChange = props.onChange, showQuickJumper = props.showQuickJumper;
    var _a = useState(current), cur = _a[0], setCur = _a[1]; //当前的页码状态
    var _b = useState(false), jumperTopic = _b[0], setJumperTopic = _b[1]; //focus控制显示（输入后回车框）
    useEffect(function () {
        //当cur变化后实时获取到cur的值
        if (onChange && cur) {
            onChange(cur); //执行传入的回调
        }
    }, [cur]);
    //获取页数
    var getPageNum = function (total, pageSize) {
        return Math.ceil(total / pageSize);
    };
    //useMemo缓存优化获取页数
    var pageNum = useMemo(function () { return getPageNum(total, pageSize); }, [total, pageSize]);
    var generateList = function (pageNum) {
        if (cur)
            //cur可能为undefined，默认值为1
            return new Array(pageNum).fill("").map(function (item, index) {
                //长度和填充页数相等的数组
                return (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: classnames("item", {
                            active: cur === index + 1,
                            hidden: (pageNum > 5 && cur <= 3 && index + 1 > 5) || //点击1、2、3时大于5的页码都隐藏显示
                                (pageNum > 5 &&
                                    cur >= pageNum - 2 &&
                                    index + 1 < pageNum - 4) || //点击倒数1，2，3时，小于倒数第四的页码隐藏
                                (pageNum > 5 &&
                                    cur < pageNum - 2 &&
                                    cur > 3 &&
                                    (index + 1 > cur + 2 || index + 1 < cur - 2)),
                            show: pageNum > 5 && (index + 1 === pageNum || index + 1 === 1),
                            disabled: disabled,
                            "active-disabled": cur === index + 1 && disabled,
                        }), key: index, onClick: function () {
                            setCur(index + 1);
                        } }, index + 1),
                    React.createElement("div", { className: classnames("item", {
                            //控制...的显示和不显示
                            hidden: pageNum > 0,
                            show: (pageNum > 5 && cur > 4 && index + 1 === 1) ||
                                (pageNum > 5 &&
                                    cur < pageNum - 3 &&
                                    index + 1 === pageNum - 1),
                            disabled: disabled,
                        }), onClick: function () {
                            if (pageNum > 5 && cur > 4 && index + 1 === 1) {
                                if (cur === 5) {
                                    //解决bug最前面的...(当cur为5时点击...变成1才对)
                                    setCur(cur - 4);
                                }
                                else {
                                    setCur(cur - 5);
                                }
                            }
                            if (pageNum > 5 &&
                                cur < pageNum - 3 &&
                                index + 1 === pageNum - 1) {
                                if (cur === pageNum - 4) {
                                    //当cur为n-4时点击...变成n才对
                                    setCur(cur + 4);
                                }
                                else {
                                    setCur(cur + 5);
                                }
                            }
                        } }, "...")));
            });
    };
    var handlePrev = function () {
        if (cur && cur > 1) {
            setCur(cur - 1);
        }
    };
    var handleNext = function () {
        if (cur && cur < pageNum) {
            setCur(cur + 1);
        }
    };
    // @ts-ignore
    var inputRef = useRef("");
    return (React.createElement("div", { className: classnames("generateList", className, {
            disabled: disabled,
        }), style: style },
        React.createElement("div", { className: classnames("item", {
                disabled: disabled,
            }), onClick: handlePrev }, "<"),
        generateList(pageNum),
        React.createElement("div", { className: classnames("item", {
                disabled: disabled,
            }), onClick: handleNext }, ">"),
        showQuickJumper ? (React.createElement("div", { style: { marginLeft: "20px" }, id: "jump" },
            React.createElement("div", { className: "main-jumperTopic" },
                "\u8DF3\u81F3",
                React.createElement("input", { className: classnames("quickJumper", {
                        disabled: disabled,
                    }), type: "text", ref: inputRef, onChange: function (e) {
                        inputRef.current.value = e.target.value;
                    }, onKeyDown: function (e) {
                        if (e.keyCode === 13) {
                            //确认的时候跳转
                            var value = Number(inputRef.current.value);
                            if (value > 0 && value <= pageNum) {
                                setCur(value);
                            }
                            inputRef.current.value = "";
                        }
                    }, onFocus: function () {
                        setJumperTopic(true);
                    }, onBlur: function () {
                        setJumperTopic(false);
                    } }),
                React.createElement(Transition, { in: jumperTopic, animation: "zoom-in-bottom", timeout: 300, className: "Topic" },
                    React.createElement("div", null, "\u8F93\u5165\u540E\u56DE\u8F66")),
                "\u9875"))) : (React.createElement(React.Fragment, null))));
};
Pagination.defaultProps = {
    current: 1,
};
export default Pagination;
