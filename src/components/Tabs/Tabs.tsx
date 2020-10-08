import React from 'react'
import classNames from 'classnames'

type TabsType = 'line' | 'card'//tabs的类型
type selectCallback = (selectedIndex: number) => void//点击之后的回调函数类型

interface TabsProps {
    defaultIndex?: number
    className?: string
    onSelect?: selectCallback
    type?: TabsType
}
const Tabs: React.FC<TabsProps> = (props) => {
    return (
        <></>
    )
}
