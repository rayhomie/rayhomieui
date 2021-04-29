import React from 'react';
export declare enum AlertType {
    Default = "default",
    Success = "success",
    Danger = "danger",
    Warning = "warning"
}
interface BaseAlertProps {
    className?: string;
    alertType?: AlertType;
    description?: string;
    title: string;
    closeable?: boolean;
    onClose?: () => void;
    visible: boolean;
}
declare const Alert: React.FC<BaseAlertProps>;
export default Alert;
