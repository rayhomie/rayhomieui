import React, { useState, useEffect, useRef } from 'react'
import classnames from 'classnames'

interface PaginationProps {
    className?: string
    style?: React.CSSProperties
    pageSize: number//每页大小
    current?: number//指针
    total: number//总条数
    disabled?: boolean
    showQuickJumper?: boolean//快速跳转输入框
    onChange?: (next: number) => void//页码变化时回调
}

const Pagination: React.FC<PaginationProps> = (props) => {
    const {
        className,
        style,
        pageSize,
        current,
        total,
        disabled,
        onChange,
        showQuickJumper
    } = props
    const [cur, setCur] = useState(current)
    useEffect(() => {
        if (onChange && cur) {
            onChange(cur)
        }
    }, [cur])
    const getPageNum = (total: number, pageSize: number): number => {
        return Math.ceil(total / pageSize)
    }

    const pageNum = getPageNum(total, pageSize)
    const generateList = (pageNum: number) => {
        if (cur)
            return new Array(pageNum).fill('').map((item, index) => {
                return (<>
                    <div
                        className={classnames('item', {
                            'active': cur === index + 1,
                            'hidden': pageNum > 5 && cur <= 3 && index + 1 > 5
                                || pageNum > 5 && cur >= pageNum - 2 && index + 1 < pageNum - 4
                                || pageNum > 5 && cur < pageNum - 2 && cur > 3 && (index + 1 > cur + 2 || index + 1 < cur - 2),
                            'show': pageNum > 5 && (index + 1 === pageNum || index + 1 === 1),
                            disabled,
                            'active-disabled': cur === index + 1 && disabled
                        })}
                        key={index}
                        onClick={() => {
                            setCur(index + 1)
                        }}
                        onDoubleClick={(e) => { e.preventDefault() }}
                    >
                        {index + 1}
                    </div>
                    <div
                        className={classnames('item', {
                            'hidden': pageNum > 0,
                            'show': pageNum > 5 && cur > 4 && index + 1 === 1
                                || pageNum > 5 && cur < pageNum - 3 && index + 1 === pageNum - 1,
                            disabled
                        })}
                        onClick={() => {
                            if (pageNum > 5 && cur > 4 && index + 1 === 1) {
                                if (cur === 5) {//解决bug最前面的...
                                    setCur(cur - 4)
                                } else { setCur(cur - 5) }
                            }
                            if (pageNum > 5 && cur < pageNum - 3 && index + 1 === pageNum - 1) {
                                if (cur === pageNum - 4) {
                                    setCur(cur + 4)
                                } else { setCur(cur + 5) }
                            }
                        }}
                    >
                        ...
                    </div>
                </>
                )
            })
    }
    const handlePrev = () => {
        if (cur && cur > 1) {
            setCur(cur - 1)
        }
    }
    const handleNext = () => {
        if (cur && cur < pageNum) {
            setCur(cur + 1)
        }
    }
    const inputRef = useRef<HTMLInputElement>(document.createElement("input"))
    return (
        <div
            className={classnames('generateList', className, {
                disabled
            })}
            style={style}
        >
            <div
                className={classnames('item', {
                    disabled
                })}
                onClick={handlePrev}
            >
                {'<'}
            </div>
            {generateList(pageNum)}
            <div
                className={classnames('item', {
                    disabled
                })}
                onClick={handleNext}
            >
                {'>'}
            </div>
            <div style={{ marginLeft: '20px' }}>
                <div>跳至
                    <input
                        className={classnames('quickJumper', {
                            disabled
                        })}
                        type="text"
                        ref={inputRef}
                        onChange={(e) => {
                            inputRef.current.value = e.target.value
                        }}
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                const value = Number(inputRef.current.value)
                                if (value > 0 && value <= pageNum) {
                                    setCur(value)
                                }
                            };
                        }
                        }
                    />页</div>
            </div>
        </div>
    )
}

Pagination.defaultProps = {
    current: 1
}
export default Pagination