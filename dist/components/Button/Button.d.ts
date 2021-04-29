import React from "react";
export declare enum ButtonSize {
    Large = "lg",
    Small = "small"
}
export declare enum ButtonType {
    Primary = "primary",
    Default = "default",
    Danger = "danger",
    Link = "link"
}
export interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: "lg" | "small";
    btnType?: "primary" | "default" | "danger" | "link";
    children: React.ReactNode;
    href?: string;
}
declare type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
declare const Button: React.FC<ButtonProps>;
export default Button;
