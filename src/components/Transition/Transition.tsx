import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName = "zoom-in-top" | "zoom-in-left" | "zoom-in-bottom";

export type TransitionProps = CSSTransitionProps & {
  //继承CSSTransition的属性
  animation?: AnimationName; //新增加一个字面量属性值
};

const Transition: React.FC<TransitionProps> = (props) => {
  const { children, classNames, animation, ...restProps } = props;
  return (
    <CSSTransition //如果传入了classNames属性，就使用classNames属性，不使用自定义的animation
      classNames={classNames ? classNames : animation}
      {...restProps} //把剩余的props全部传入
    >
      <div>{children}</div>
    </CSSTransition>
  );
};
Transition.defaultProps = {
  //默认
  unmountOnExit: true,
  appear: true,
};
export default Transition;
