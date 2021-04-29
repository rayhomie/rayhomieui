import React from "react";
import classNames from "classnames";

export enum ButtonSize {
  Large = "lg",
  Small = "small",
}

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Link = "link",
}

export interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string; //link有href才是有效的
}

//为了让我们自定义的组件拥有button和a标签的原生React属性
type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>;
//原生的button属性（react提供的）和 基本自定义属性 的交叉类型
type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>;
//原生的a标签属性（react提供的）和 基本自定义属性 的交叉类型
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
//可选的 button和a标签 的交叉类型

const Button: React.FC<ButtonProps> = (props) => {
  //使用rest运算符把多传入的props取出来
  const {
    disabled,
    className,
    size,
    btnType,
    children,
    href,
    ...restProps
  } = props;
  //需要安装classnames和@types/classnames包，对className进行拼接
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType, //后面的值返回true加上类名，false不加
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType["Link"] && disabled,
    //如果是传入的props.btnTpye是Link类型，则加上一个disabled类名
  });

  if (btnType === ButtonType["Link"] && href) {
    //如果是link类型
    return (
      <a
        className={classes}
        href={href}
        {...restProps} //把剩余的props全部传入
      >
        {children}
      </a>
    );
  } else {
    //button类型
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps} //把剩余的props全部传入
      >
        {children}
      </button>
    );
  }
};
Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
};

export default Button;
