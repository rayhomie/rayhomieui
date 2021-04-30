# [Rayhomie UI](http://ui.rayhomie.icu/)

文档：http://ui.rayhomie.icu/
## 安装依赖

```bash
#使用npm安装
npm install --save rayhomieui
#使用yarn安装
yarn add rayhomieui

```

## 全局引入样式

如果想要正常使用 Rayhomie UI，还需要在我们项目的 css 入口文件中导入 rayhomieui 的 css 层叠样式文件。
假设我们项目的 css 全局入口文件名叫 global.css

```css
//global.css
@import "rayhomieui/dist/index.css";
...
```

或者我们也可以在项目的 JS 入口文件中全局引入样式文件，假设这里叫 App.js

```js
//App.js
import "rayhomieui/dist/index.css";
...
```

## 使用组件

```jsx
import React from "react";
import { Button } from "rayhomieui";

const Hello = () => {
  return <Button>Hello</Button>;
};

export default Hello;
```
