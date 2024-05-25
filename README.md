<img src="https://oi-contrib.github.io/Snipio.js/logo.png">

# [Snipio.js](https://github.com/oi-contrib/Snipio.js)
支持截图、编辑和保存到本地功能，且可扩展

<p>
    <a href="https://zxl20070701.github.io/toolbox/#/npm-download?packages=snipio.js&interval=7">
        <img src="https://img.shields.io/npm/dm/snipio.js.svg" alt="downloads">
    </a>
    <a href="https://www.npmjs.com/package/snipio.js">
        <img src="https://img.shields.io/npm/v/snipio.js.svg" alt="Version">
    </a>
    <a href="https://github.com/oi-contrib/Snipio.js" target='_blank'>
        <img alt="GitHub repo stars" src="https://img.shields.io/github/stars/oi-contrib/Snipio.js?style=social">
    </a>
</p>

<img src="https://nodei.co/npm/snipio.js.png?downloads=true&amp;downloadRank=true&amp;stars=true" alt="NPM">

## 如何使用？

首先需要进行安装：

```
npm install --save snipio.js
```

然后在项目中引入：

```js
import Snipio from 'snipio.js'
Snipio({

    /**
     * 启动后是否需要先让用户截图，可选
     * 1、h5 页面截图方式
     * 2、system 系统截图方式
     * 3、none 不截图（默认值）
     */
    snipping: "h5"
})
```

当然，你也可以使用CDN的方式：

```html
<script src="https://unpkg.com/snipio.js"></script>
```

然后，在代码开头启动：

```js
Snipio({
    snipping: "system"
})
```

### 使用html2canvas截图

> 0.2.0 新增

截取屏幕你也可以选择使用`html2canvas`，只需要：

```js
Snipio({
    snipping: "html2canvas",
    html2canvas
});
```

### 扩展工具箱

你可以通过下面方式，扩展工具按钮：

```js
Snipio({
    tool: [{
        label: "确认",
        callback: function () {
            console.log("你点击了确认按钮！");
        }
    }]
})
```

上面我们就给工具箱添加了一个确定按钮。

如果你希望添加的按钮进行更复杂的业务处理，比如类似“画笔”或“马赛克”，你可以这样：

```js
Snipio({
    tool: [{
        label: "马赛克",

        // v0.2.0 新增
        drawHistroy:{
            mosaic:function(history){}
        },

        callback: function () {
            return {
                on:{
                    mouseDown:function(event){},
                    mouseMove:function(event){},
                    mouseUp:function(event){}
                }
            }
        },
        hold: true
    }]
})
```

其中on的事件会主动触发。

> 具体代码你可以查看：[./src/toolbox/index.js](./src/toolbox/index.js)

此外，包括on及其下面的mouseDown等在内的所有配置都可选，且其中的this均一致，格式如下：

```js
this = {
    // 截图
    base64:String,

    // 画布节点
    view: Element,

    // 画布尺寸
    width: Number,
    height: Number,

    // 画笔
    painter,

    // 历史记录
    history: Array,

    // 绘制历史记录，v0.2.0 新增
    drawHistroy: Function,

    // 关闭
    close: Function,

    // 获取当前画布base64
    toDataURL: Function
}
```

你可以借助这个this来获取或修改当前的信息等。

## 版权

MIT License

Copyright (c) [zxl20070701](https://zxl20070701.github.io/notebook/home.html) 走一步，再走一步