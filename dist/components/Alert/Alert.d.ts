import React from "react";
export declare enum AlertType {
    Default = "default",
    Success = "success",
    Danger = "danger",
    Warning = "warning"
}
export interface BaseAlertProps {
    className?: string;
    alertType?: "default" | "success" | "danger" | "warning";
    description?: string;
    title: string;
    closeable?: boolean;
    onClose?: () => void;
    visible: boolean;
    style?: React.CSSProperties;
}
declare const Alert: React.FC<BaseAlertProps>;
export default Alert;
