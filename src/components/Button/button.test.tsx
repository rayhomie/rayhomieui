import React from 'react';
import { render } from '@testing-library/react';//使用测试框架render
import Button from './Button';//导入测试组件

describe('test Button component', () => {
    it('should render the correct default button', () => {
        const wrapper = render(<Button>Nice</Button>)
        const element = wrapper.getByText('Nice')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
    })
    it('should render the correct component based on different props', () => {
        const wrapper = render(<Button>hhh</Button>)
        const element = wrapper.getByText('hhh')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveProperty('disabled')
    })
})