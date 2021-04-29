GitHub地址:https://github.com/rayhomie/rayhomieUI

### 一、sass的使用

1、@import方式引入scss文件，后面必须带后缀名scss

```scss
@import "main.scss";
```

2、Partials方式引入*base.scss文件,文件必须以*（下划线）开头，可以不用带后缀名

```scss
@import "_base";
```

**sass @import**和css @import命令的区别：

CSS @import 指令在每次调用时，都会创建一个额外的 HTTP 请求。但，Sass @import 指令将文件包含在 CSS 中，不需要额外的 HTTP 请求。

**Sass Partials**：如果你不希望将一个 Sass 的代码文件编译到一个 CSS 文件，你可以在文件名的开头添加一个下划线。这将告诉 Sass 不要将其编译到 CSS 文件。（**partials只能当做模块导入**，不能当做css文件来编译使用。）

例如：以下实例创建一个 _colors.scss 的文件，但是不会编译成 _colors.css 文件：

_colors.scss 文件代码：

```scss
$myPink: #EE82EE;
$myBlue: #4169E1;
$myGreen: #8FBC8F;
```

如果要**导入该文件，则不需要使用下划线**：

实例:

```scss
@import "colors";
body {
 font-family: Helvetica, sans-serif;
 font-size: 18px;
 color: $myBlue;
}
```

注意：**请不要将带下划线与不带下划线的同名文件放置在同一个目录下**，比如，_colors.scss 和 colors.scss 不能同时存在于同一个目录下，否则带下划线的文件将会被忽略。



### 二、Button组件

- 使用classnames和@types/classnames包对类名进行拼接
- 使用字符串枚举类型定义声明props，使用时也需要导入enum类型常量进行使用组件
- js对象中属性键名是动态变化的，需要使用`[]`括起来设置键名，可以用这种方法进行字符串拼接键名
- 使用sass的@mixin和@include混入使用样式
- 使用交叉类型，使用react提供的原生标签属性类型

```tsx
import React, { useState } from 'react'
import classNames from 'classnames'

export enum ButtonSize {
    Large = 'lg',
    Small = 'small'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

interface BaseButtonProps {
    className?: string
    disabled?: boolean
    size?: ButtonSize
    btnType?: ButtonType
    children: React.ReactNode,
    href?: string//link有href才是有效的
}

//为了让我们自定义的组件拥有button和a标签的原生React属性
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
//原生的button属性（react提供的）和 基本自定义属性 的交叉类型
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
//原生的a标签属性（react提供的）和 基本自定义属性 的交叉类型
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
//可选的 button和a标签 的交叉类型

const Button: React.FC<ButtonProps> = (props) => {
    //使用rest运算符把多传入的props取出来
    const { disabled, className, size, btnType, children, href, ...restProps } = props
    //需要安装classnames和@types/classnames包，对className进行拼接
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,//后面的值返回true加上类名，false不加
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType['Link']) && disabled
        //如果是传入的props.btnTpye是Link类型，则加上一个disabled类名
    })

    if (btnType === ButtonType['Link'] && href) {//如果是link类型
        return (
            <a
                className={classes}
                href={href}
                {...restProps}//把剩余的props全部传入
            >
                {children}
            </a>
        )
    } else {//button类型
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}//把剩余的props全部传入
            >
                {children}
            </button>
        )
    }
}
Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default,
}

export default Button
```

外部使用组件：

```tsx
import React from 'react';
import './styles/index.scss';
import Button, { ButtonSize, ButtonType } from './components/Button/index'
//使用组件时也需要导入*字符串枚举*来设置相应props的值，正常使用组件
function App() {
  return (
    <Button 
      btnType={ButtonType.Danger} 
      size={ButtonSize.Small}
    >
      按钮
    </Button>
  );
}

export default App;
```

#### sass混入@mixin的使用：

使用@mixin和@include来重用重复的css代码

```scss
//定义mixin
@mixin button-size($padding-y, $padding-x, $font-size, $border-raduis) {
  padding: $padding-y $padding-x;
  font-size: $font-size;
  border-radius: $border-raduis;
}
```

@include使用mixin

```scss
@include button-size( $btn-padding-y,  $btn-padding-x,  $btn-font-size,  $border-radius);
```

#### 测试用例：

```jsx
 <Button
        btnType={ButtonType.Default}
        size={ButtonSize.Small}
      >
        Default
      </Button>
      <Button
        btnType={ButtonType.Primary}
        size={ButtonSize.Small}
      >
        Primary
      </Button>
      <Button
        btnType={ButtonType.Primary}
        size={ButtonSize.Large}
      >
        Large Primary
      </Button>
      <Button
        btnType={ButtonType.Danger}
        size={ButtonSize.Small}
      >
        Danger
      </Button>
      <Button
        btnType={ButtonType.Default}
        size={ButtonSize.Small}
        disabled
      >
        disabled
      </Button>
      <Button
        btnType={ButtonType.Link}
        size={ButtonSize.Small}
        href='http://www.baidu.com/'
      >
        baidu Link
      </Button>
      <Button
        btnType={ButtonType.Link}
        size={ButtonSize.Small}
        href='http://www.baidu.com/'
        disabled
      >
        disabled Link
      </Button>
```

![button](https://github.com/rayhomie/rayhomieUI/blob/master/public/img/20201004142419614.png)

### 三、Alert组件

- 使用**react-transition-group**编写动画过渡效果
- 使用**ts类型断言**，对传入的可选props函数进行执行

```tsx
import React, { useState } from 'react'
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
```

css的编写：

```css
.card-enter,
.card-appear {
    opacity: 0;
    transform: scale(.8);
}

.card-enter-active,
.card-appear-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 300ms, transform 300ms;
}

.card-exit {
    opacity: 1;
}

.card-exit-active {
    opacity: 0;
    transform: scale(.8);
    transition: opacity 300ms, transform 300ms;
}

.alt {
    position: relative;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
}

.alt-default {
    color: #fff;
    background: #0d6efd;
    border-color: #0262ef;
}

.alt-success {
    color: #fff;
    background: #52c41a;
    border-color: #49ad17;
}

.alt-danger {
    color: #fff;
    background: #dc3545;
    border-color: #d32535;
}

.alt-warning {
    color: #fff;
    background: #fadb14;
    border-color: #efd005;
}

.alt-title {}

.alt-description {
    font-size: 0.875rem;
    margin: 0.3rem 0 0;
}

.alt-close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.75rem 1.25rem;
    color: inherit;
    cursor: pointer;
}

.alt-close-none {
    display: none;
}
```

#### 测试用例：

```jsx
const [state, setState] = useState(false);

<button onClick={() => { setState(!state) }}>显示</button>

<Alert alertType={AlertType.Default} title='Default' description='hhh' onClose={() => { setState(!state) }} visible={state}></Alert>
<Alert alertType={AlertType.Success} title='Success' visible></Alert>
<Alert alertType={AlertType.Danger} title='Danger' visible></Alert>
<Alert alertType={AlertType.Warning} title='Warning' closable={false} visible></Alert>
```

![alert](https://github.com/rayhomie/rayhomieUI/blob/master/public/img/20201004155259299.gif)



### 四、组件测试

Jest通用测试框架：断言库，[Common Matchers](https://jestjs.io/docs/en/using-matchers)

[React专用测试工具](https://react.docschina.org/docs/test-utils.html)：

[①React Testing Library](https://testing-library.com/docs/react-testing-library/intro)☆

- 对组件编写测试用例，就像终端用户在使用它一样方便。

[②Airbnb推出的Enzyme](https://enzymejs.github.io/enzyme/)

- 对react组件的输出进行断言、操控、遍历等。（类似于jquery的链式操作）

#### 使用@testing-library/react进行组件测试：

```tsx
//button.test.tsx
import React from 'react';
import { render } from '@testing-library/react';//使用测试框架render
import Button from './index';//导入测试组件

test('our first react test case', () => {
    const wrapper = render(<Button>Nice</Button>)
    const element = wrapper.queryByText('Nice')
    expect(element).toBeTruthy()
})

//在终端中输入npm run test进行测试
```

#### 使用@testing-library/jest-dom进行dom断言测试：

1、在src下约定setupTests.ts文件中进行引入工具包

```tsx
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
```

2、创建对应的单元测试xxx.test.tsx文件，就可以使用一些dom的断言进行测试

```tsx
//button.test.tsx
import React from 'react';
import { render } from '@testing-library/react';//使用测试框架render
import Button from './index';//导入测试组件

test('our first react test case', () => {
    const wrapper = render(<Button>Nice</Button>)
    const element = wrapper.queryByText('Nice')
    expect(element).toBeTruthy()
})

//在终端中输入npm run test进行测试
```

```jsx
import React from 'react';
import { render } from '@testing-library/react';//使用测试框架render
import Button from './index';//导入测试组件

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
```



### 五、Menu组件

两种方案：

```jsx
//1.不完美的解决方案
const items = [
  {disabled:false,element :(<a>title</a>)},
  {disabled:true,element :'disabled link'}
];
<Menu defaultIndex={0} items={items} onSelect={} mode='vertical'>
</Menu>

//2.更加语义化的解决方案，贴近于html
<Menu defaultIndex={0} onSelect={} mode='vertical'>
  <Menu.Item><a>title</a></Menu.Item>
  <Menu.Item disabled>disabled link</Menu.Item>
</Menu>
```

- 使用context进行组件间传值
- [React.Children API](https://zh-hans.reactjs.org/docs/react-api.html#reactchildren) 遍历传入的子节点
- 使用组件displayName进行调试

#### 组件Menu：

```tsx
import React, { useState, createContext } from 'react'
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical'
type selectCallback = (selectedIndex: number) => void

interface MenuProps {//定义组件props类型
    defaultIndex?: number//默认被选中的索引值（默认0）
    mode?: MenuMode//横向|纵向（默认横向）
    onSelect?: selectCallback//点击选择之后的触发的函数
    className?: string//用户自定义的传入的class
    style?: React.CSSProperties//用户自定义组件的style传递给ul
}

interface MenuContext {//定义context传递类型，子父组件间传值
    index: number
    onSelect?: selectCallback
}
//导出创建的context供子组件使用且提供默认值
export const MenuContext = createContext<MenuContext>({ index: 0 })

const Menu: React.FC<MenuProps> = (props) => {
    const { defaultIndex, mode, children, className, style, onSelect } = props
    const [Active, setActive] = useState(defaultIndex)//由父组件进行所有状态的维护
    const classes = classNames('menu', className, {
        'menu-vertical': mode === 'vertical'
    })
    const handleClick = (index: number) => {
        setActive(index)//维护状态改变
        if (onSelect) onSelect(index)//执行用户自定义传入的方法
    }
    //初始化需要共享的状态和修改的方法
    const passedContext: MenuContext = {
        index: Active || 0,//将状态共享
        onSelect: handleClick//将函数共享
    }
    //使用context所有的状态都由父组件进行控制
    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passedContext}>{/*提供者*/}
                {children}
            </MenuContext.Provider>
        </ul>
    )
}
Menu.defaultProps = {
    defaultIndex: 0,
    mode: 'horizontal'
}
export default Menu
```

#### 子组件MenuItem：

```tsx
import React, { useContext } from 'react'
import classNames from 'classnames';
import { MenuContext } from './index'

interface MenuItemProps {
    index: number//每个item不用的索引值
    disabled?: boolean//是否可用
    className?: string
    style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const { index, disabled, className, style, children } = props;
    const context = useContext(MenuContext)//使用共享的context
    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    })
    const handleClick = () => {
        //点击li触发onSelect方法并传递相应index给父组件
        if (context.onSelect && !disabled) context.onSelect(index)
    }
    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}
MenuItem.displayName = 'MenuItem'
export default MenuItem
```

#### 测试用例：

```jsx
 <Menu defaultIndex={0} onSelect={(i) => alert(i)} mode='vertical'>
   <MenuItem index={0}>cool link1</MenuItem>
   <MenuItem index={1}>cool link2</MenuItem>
   <MenuItem index={2}>cool link3</MenuItem>
   <MenuItem index={3} disabled>cool link4</MenuItem>
</Menu>
<Menu defaultIndex={0} onSelect={(i) => alert(i)}>
  <MenuItem index={0}>cool link1</MenuItem>
  <MenuItem index={1}>cool link2</MenuItem>
  <MenuItem index={2}>cool link3</MenuItem>
  <MenuItem index={3} disabled>cool link4</MenuItem>
</Menu>
```

![menu](https://github.com/rayhomie/rayhomieUI/blob/master/public/img/20201004144142411.gif)