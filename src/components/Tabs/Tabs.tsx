import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { TabItemProps } from './TabItem'

type TabsType = 'line' | 'card'//tabs的类型
type selectCallback = (selectedIndex: number) => void//点击之后的回调函数类型

interface TabsProps {
    defaultIndex?: number
    className?: string
    onSelect?: selectCallback
    type?: TabsType
    style?: React.CSSProperties//用户自定义组件的style传递给ul
}
interface TabsContext {
    index: number
    onSelect?: selectCallback
    type?: TabsType
}
export const TabsContext = createContext<TabsContext>({ index: 0 })

const Tabs: React.FC<TabsProps> = (props) => {
    const { defaultIndex, className, onSelect, type, style, children } = props
    const [Active, setActive] = useState(defaultIndex)//由父组件进行所有状态的维护
    const classes = classNames('tabs', 'tab-content-main', className, {
        'tabs-line': type === 'line',
        'tabs-card': type === 'card'
    })
    const handleClick = (index: number) => {
        setActive(index)//维护状态改变
        if (onSelect) onSelect(index)//执行用户自定义传入的方法
    }
    const passedContext: TabsContext = {
        index: Active || 0,//将状态共享
        onSelect: handleClick,//将函数共享
        type
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<TabItemProps>//类型断言
            const { displayName } = childElement.type//取出child的displayName
            if (displayName === 'TabItem') {
                return React.cloneElement(childElement, { index: index })
            } else {
                console.error('Warning: Menu has a child which is not a TabItem component')
            }

        })
    }
    return (
        <ul className={classes} style={style}>
            <TabsContext.Provider value={passedContext}>
                {renderChildren()}
            </TabsContext.Provider>
        </ul>
    )
}
Tabs.defaultProps = {
    defaultIndex: 0,
    type: 'line'
}
export default Tabs
