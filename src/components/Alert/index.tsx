import React from 'react'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group';

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
    visible: boolean//显示状态
}

const Alert: React.FC<BaseAlertProps> = (props) => {
    const { className, alertType, title, description, closable, onClose, visible } = props
    const classes = classNames('alt', className, {
        [`alt-${alertType}`]: alertType,
    })
    const closeIconClasses = classNames({
        'alt-close': closable//true就显示类名，false类名为null，执行alt-close-none
    })
    const onclose = onClose as () => void //类型断言
    return (<>
        <CSSTransition
            in={visible}//为true进入显示组件（主要通过in属性来控制组件状态）
            classNames="card"//设置类名的前缀
            timeout={400}//设置过渡动画事件
            unmountOnExit={true}//消失动画结束后 + display:none
        >
            <div
                className={classes}
            >
                <span className='alt-title'>{title}</span>
                <p className='alt-description'>{description}</p>
                <span className={closeIconClasses || 'alt-close-none'}
                    onClick={() => {
                        onclose()
                    }}>关闭</span>
            </div>
        </CSSTransition>
    </>)
}
Alert.defaultProps = {
    closable: true,
    alertType: AlertType.Default,
    onClose: () => { }
}
export default Alert