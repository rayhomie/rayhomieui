import React, { ReactElement, InputHTMLAttributes } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

type InputSize = 'lg' | 'sm'
//使用Omit忽略掉原生Input属性接口中的size属性，我们需要重新定义
//Omit<interfaceName,propertyValue>
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean
    size?: InputSize
    icon?: IconProp
    prepand?: string | ReactElement
    append?: string | ReactElement
    className?: string
}
export const Input: React.FC<InputProps> = (props) => {
    //取出各种的属性
    const { disabled, size, icon, prepand, append, className, ...restProps } = props
    //根据属性计算不同的className

    return (//根据属性判断是否添加特定的节点
        <></>
    )
}