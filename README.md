# 时间轴游戏模块

## [小新快跑](https://github.com/827652549/timeline-game)介绍

[本项目](https://github.com/827652549/timeline-game)为[苏一恒](https://github.com/827652549)个人网站的（预备）组件之一，以游戏的形式展示自己的比较重要的人生历程（时间轴）。

> 创造不易，感谢手动star🌟

## 游戏说明

键盘左右键控制人物，按压即可移动，松开即可暂停。当经过不同建筑时会有不同的说明，所有的历程按照时间顺序一字排开。

## 安装/启动说明
将项目下载到本地并执行命令

```
npm install 
npm run start
```

![游戏说明](https://s1.ax1x.com/2020/05/16/Y61pIH.jpg)
![游戏截图](https://s1.ax1x.com/2020/05/16/Y61eeS.jpg)

## 迁移说明
可以将整个GamePine文件夹迁移到你的项目中，然后引入组件

width：设置模块在浏览器中的宽度

```JSX
import GamePine from './GamePine'

...

<GamePine width={1000}/>
```

如果需要将本模块改成自己的时间线，仅需修改state.buildsJson配置：

修改state.bulidsJson:
```javascript
[
    {
      id: 1, //序号
      date: 1998, //年份
      title: '万圣节凌晨！小鬼降世！', //标题
      detail: '告别牛头马面...', // 内容
      img_url: 'images/hospital.png', // 背景建筑的图片url
      scale: 0.7, // 背景图片缩放比例
      x: 200, // 背景图片的x轴位置
      y: 284 // 背景图片的y轴位置
    },
   {}...
]
```

当然你可以有更多的DIY方案，修改这些state的配置：

- initSetting // 修改初始化的Pixi的设置，可参照PixiJS文档
- backgroundsJson // 修改背景和底板
- xiaoxin // 修改人物的走动动画

## 技术概要
由react-create-app搭建的本演示Demo

核心依赖：

- React
- PIXIJS

性能优化方案：

- 碰撞检测：未使用PIXI文档推荐的实时检测，而是只在小新移动时检测，并触发事件。当人物不移动时，游戏模块相当于是一张静态
canvas。
- 静态资源：图片纹理静态资源已经过ps处理压缩/

## 层级结构

图片集保存在public/images下

```
.
├── README.md
├── package-lock.json
├── package.json
├── public
└── src
    ├── App.css
    ├── App.js
    ├── GamePine
    │   ├── bump.js
    │   ├── index.js
    │   └── utils.js
    ├── index.css
    └── index.js
```

## LICENSE

MIT
