import React from 'react';
export interface TabItemProps {
    index?: number;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    labal: any;
}
declare const TabItem: React.FC<TabItemProps>;
export default TabItem;
