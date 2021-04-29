import React from "react";
import classNames from "classnames";
// import { CSSTransition } from 'react-transition-group';
import Transition from "../Transition/Transition";
import Icon from "../Icon/Icon";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export enum AlertType {
  Default = "default",
  Success = "success",
  Danger = "danger",
  Warning = "warning",
}
interface BaseAlertProps {
  className?: string;
  alertType?: "default" | "success" | "danger" | "warning";
  description?: string; //描述
  title: string; //标题
  closeable?: boolean; //是否显示关闭图标
  onClose?: () => void; //关闭alert时触发的事件
  visible: boolean; //显示状态
}

const Alert: React.FC<BaseAlertProps> = (props) => {
  const {
    className,
    alertType,
    title,
    description,
    closeable,
    onClose,
    visible,
  } = props;
  const classes = classNames("alt", className, {
    [`alt-${alertType}`]: alertType,
  });
  const closeIconClasses = classNames({
    "alt-close": closeable, //true就显示类名，false类名为null，执行alt-close-none
  });
  const onclose = onClose as () => void; //类型断言
  return (
    <>
      {/* <CSSTransition
            in={visible}//为true进入显示组件（主要通过in属性来控制组件状态）
            classNames="card"//设置类名的前缀
            timeout={400}//设置过渡动画事件
            unmountOnExit={true}//消失动画结束后 + display:none
        >
            <div
                className={classes}
            >
                <span className='alt-title'>{title}</span>
                <p className='alt-description'>{description}</p>
                <span className={closeIconClasses || 'alt-close-none'}
                    onClick={() => {
                        onclose()
                    }}>关闭</span>
            </div>
        </CSSTransition> */}

      <Transition
        in={visible} //为true进入显示组件（主要通过in属性来控制组件状态）
        animation="zoom-in-left"
        timeout={400} //设置过渡动画事件
      >
        <div className={classes}>
          <span className="alt-title">{title}</span>
          <p className="alt-description">{description}</p>
          <span className={closeIconClasses || "alt-close-none"}>
            <Icon
              icon="window-close"
              size="1x"
              onClick={() => {
                onclose();
              }}
            />
          </span>
        </div>
      </Transition>
    </>
  );
};
Alert.defaultProps = {
  closeable: true,
  alertType: "default",
  onClose: () => {},
};
export default Alert;
