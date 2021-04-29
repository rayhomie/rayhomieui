import { useState, useRef, useEffect } from 'react';
var useDraggable = function () {
    var _a = useState(false), isMove = _a[0], setIsMove = _a[1];
    var _b = useState([0, 0]), mousePosition = _b[0], setMousePosition = _b[1]; //鼠标的坐标
    var _c = useState([0, 0]), divPosition = _c[0], setDivPosition = _c[1]; //div的坐标
    var Ref = useRef(null);
    var MouseDown = function (e) {
        e.preventDefault();
        setIsMove(true);
        Ref.current.style.cursor = 'move';
        setMousePosition([e.clientX, e.clientY]);
    };
    var MouseMove = function (e) {
        e.preventDefault();
        if (!isMove)
            return;
        var _a = [e.clientX, e.clientY], mouseX = _a[0], mouseY = _a[1];
        Ref.current.style.left = divPosition[0] + mouseX - mousePosition[0] + "px";
        Ref.current.style.top = divPosition[1] + mouseY - mousePosition[1] + "px";
    };
    var MouseUp = function (e) {
        e.preventDefault();
        setIsMove(false);
        Ref.current.style.cursor = 'default';
        setDivPosition([Ref.current.offsetLeft, Ref.current.offsetTop]);
    };
    useEffect(function () {
        setDivPosition([Ref.current.offsetLeft, Ref.current.offsetTop]);
    }, []);
    return {
        Ref: Ref, MouseDown: MouseDown, MouseMove: MouseMove, MouseUp: MouseUp
    };
};
export default useDraggable;
