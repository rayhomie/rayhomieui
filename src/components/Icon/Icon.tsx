//对react-fontawesome库进行二层封装
import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

//定义自定义主题颜色
export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'
interface IconProps extends FontAwesomeIconProps {//继承icon库暴露出来props
    theme?: ThemeProps
    className?: string
}
const Icon: React.FC<IconProps> = (props) => {
    const { className, theme, ...restProps } = props
    const classes = classNames('icon', className, {
        [`icon-${theme}`]: theme,
    })
    return (
        <FontAwesomeIcon className={classes} {...restProps} />
    )
}
export default Icon