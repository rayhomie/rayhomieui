import React from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export declare type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps;
    className?: string;
}
declare const Icon: React.FC<IconProps>;
export default Icon;
