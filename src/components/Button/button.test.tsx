import React from 'react';
import { render } from '@testing-library/react';//使用测试框架render
import Button from './index';//导入测试组件

test('our first react test case', () => {
    const wrapper = render(<Button>Nice</Button>)
    const element = wrapper.queryByText('Nice')
    expect(element).toBeTruthy()
})