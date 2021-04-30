import React from "react";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
declare type AnimationName = "zoom-in-top" | "zoom-in-left" | "zoom-in-bottom";
export declare type TransitionProps = CSSTransitionProps & {
    animation?: AnimationName;
};
declare const Transition: React.FC<TransitionProps>;
export default Transition;
