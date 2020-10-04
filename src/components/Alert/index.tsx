import React, { useState } from 'react'
import classNames from 'classnames'

export enum AlertType {
    Default = 'default',
    Success = 'success',
    Danger = 'danger',
    Warning = 'warning',
}
interface BaseAlertProps {
    className?: string
    alertType?: AlertType
    description?: string//描述
    title: string//标题
    closable?: boolean//是否显示关闭图标
    onClose?: () => void//关闭alert时触发的事件
}

const Alert: React.FC<BaseAlertProps> = (props) => {
    const { className, alertType, title, description, closable, onClose } = props
    const classes = classNames('alt', className, {
        [`alt-${alertType}`]: alertType,
    })
    const closeIconClasses = classNames({
        'alt-close': closable//true就显示类名，false类名为null，执行alt-close-none
    })
    const [show, setShow] = useState(true)
    return (<>
        <div
            className={classes}
            style={show ? {} : { display: 'none' }}
        >
            <span className='alt-title'>{title}</span>
            <p className='alt-description'>{description}</p>
            <span className={closeIconClasses || 'alt-close-none'}
                onClick={() => {
                    setShow(!show)
                }}>关闭</span>
        </div>
    </>)
}
Alert.defaultProps = {
    closable: true,
    alertType: AlertType.Default,
}
export default Alert