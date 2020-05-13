import React, { useEffect, useState } from 'react'
import * as PIXI from 'pixi.js'
import {
  keyboard,
  hitTestTicker,
} from './utils'
import Bump from './bump'

function GamePine () {

  let Application = PIXI.Application,
    loader = PIXI.Loader.shared,
    resources = PIXI.Loader.shared.resources,
    Sprite = PIXI.Sprite,
    TilingSprite = PIXI.TilingSprite

  let ground//树木
  let woods//背景
  let builds//建筑群
  const [initSetting, setInitSetting] = useState({

    backwoodsColor: '0x061639',
    width: 1286,
    height: 640,

  })
  const [xiaoxin, setXiaoxin] = useState({
    name: '小新',
    run_images: [
      'images/xiaoxin_go_0001.png',
      'images/xiaoxin_go_0002.png',
      'images/xiaoxin_go_0003.png',
      'images/xiaoxin_go_0004.png',
      'images/xiaoxin_go_0005.png',
      'images/xiaoxin_go_0006.png'],
    animationSpeed: 0.1,
    y: 484,
    x: 50,
    // 左移需要的属性
    leftSet: {
      scale: { x: -1, y: 1 },
      pivot: { x: 83, y: 0 },
    },
    rightSet: {
      scale: { x: 1, y: 1 },
      pivot: { x: 0, y: 0 },
    },
  })
  const [backgroundsJson, setBackgroundsJson] = useState([
    {
      img_url: 'images/ground2.png',
      width: 1286,
      height: 66,
      vx: 3,
    },
    {
      img_url: 'images/background.png',
      width: 1286,
      height: 640,
      vx: 1.5,
    },
  ])
  const [bulidsJson, setBulidsJson] = useState([
    {
      id: 1,
      date: 1998,
      title: '万圣节凌晨！小鬼降世！',
      detail: 'XXXXXXXXXXXXXXXXXXXXXXX',
      img_url: 'images/hospital.png',
      isShowing: false,
      scale: 0.7,
      x: 0,
      y: 284,
    },
    {
      id: 2,
      date: 2017,
      title: '中学：典型反派人物！',
      detail: '偷办6张不同的饭卡以应对分年纪吃饭的策略；每周末3小时放假时间，2小时用来打游戏；一沓请假条只为了中午能吃上路边肉夹馍；认的10个妹妹+2个秘书可谓一段佳话；凭借一手PPT技术经常办公室乘凉；利用老师们信息不对称的漏洞，给自己调了体育课程；真实水平的物理成绩最高时全校第一，最低14分；每天学控梦，研究出了一套入睡和控梦的方法；偶尔半夜打鸡血，写个八千余字的人生感悟……；嫌弃老师随机点名不公平，做了一个点名器造福人民；每天保证10小时的睡眠时间，决不亏欠自己',
      img_url: 'images/middle-school.png',
      isShowing: false,
      scale: 1.2,
      x: 500,
      y: 199,
    },
    {
      id: 3,
      date: 2017,
      title: '肝C语言，开始入坑',
      detail: 'XXXXXXX',
      img_url: 'images/c.png',
      isShowing: false,
      scale: 2,
      x: 1500,
      y: 464,
    },
    {
      id: 4,
      date: 2017,
      title: '大学，走上逃课玩程序的不归路',
      detail: 'XXXXXXX',
      img_url: 'images/university.png',
      isShowing: false,
      scale: 0.3,
      x: 1650,
      y: 314,
    },
    {
      id: 5,
      date: 2017,
      title: '脱单！追上女神！',
      detail: 'XXXXXXX',
      img_url: 'images/inLove.png',
      isShowing: false,
      scale: 0.4,
      x: 2000,
      y: 369,
    },
    {
      id: 6,
      date: 2017,
      title: '加入校级软件实验室',
      detail: 'XXXXXXX',
      img_url: 'images/joinGroup.png',
      isShowing: false,
      scale: 1,
      x: 2300,
      y: 362,
    },
    {
      id: 7,
      date: 2018,
      title: '我去！前端贼有意思！',
      detail: 'XXXXXXX',
      img_url: 'images/definedGoal.png',
      isShowing: false,
      scale: 1,
      x: 2800,
      y: 304,
    },
    {
      id: 8,
      date: 2018,
      title: '晋升实验室负责人',
      detail: 'XXXXXXX',
      img_url: 'images/groupLeader.png',
      isShowing: false,
      scale: 0.5,
      x: 3200,
      y: 384,
    },
    {
      id: 9,
      date: 2019,
      title: '创业产品-护驾行',
      detail: 'XXXXXXX',
      img_url: 'images/production_hujiaxing.png',
      isShowing: false,
      scale: 0.3,
      x: 3700,
      y: 489,
    },
    {
      id: 10,
      date: 2019,
      title: '处女座《CanvasStudy》',
      detail: 'XXXXXXX',
      img_url: 'images/canvasStudy.png',
      isShowing: false,
      scale: 0.8,
      x: 3850,
      y: 319,
    },
    {
      id: 10,
      date: 2020,
      title: '入职-墨刀',
      detail: 'XXXXXXX',
      img_url: 'images/modao.png',
      isShowing: false,
      scale: 0.5,
      x: 4150,
      y: 469,
    },
    {
      id: 11,
      date: 2020,
      title: '斩获腾讯、阿里offers',
      detail: 'XXXXXXX',
      img_url: 'images/summerOffers.png',
      isShowing: false,
      scale: 0.5,
      x: 4600,
      y: 364,
    },
    {
      id: 12,
      date: 2021,
      title: '未来可期',
      detail: 'XXXXXXX',
      img_url: 'images/succeed.png',
      isShowing: false,
      scale: 0.5,
      x: 4880,
      y: 174,
    },
  ])

  useEffect(() => {
    const app = new Application(initSetting)
    document.getElementById('gamepine').appendChild(app.view)
    let bump = new Bump(PIXI)//碰撞对象

    // 资源列表
    let resourcesUrl = []
    bulidsJson.forEach(element => {
      //将所有的图片资源添加到resourcesUrl数组中
      resourcesUrl.push(element.img_url)
    })
    backgroundsJson.forEach(element => {
      resourcesUrl.push(element.img_url)
    })

    // 图片路径在public文件夹中 参阅：https://www.jianshu.com/p/49e8dac4a5af
    // 开始加载所有资源
    resourcesUrl.forEach(element => {
      loader.add(element)
    })

    loader.on('progress', loadProgressHandler).
      load(setup)

    function loadProgressHandler (loader, resource) {
      //Display the file `url` currently being loaded
      console.log('loading: ' + resource.url)

      //Display the percentage of files currently loaded
      console.log('进度条: ' + loader.progress + '%')
    }

    let textureArrayRight = []

    for (let i = 0; i < 6; i++) {
      let texture = PIXI.Texture.from(xiaoxin.run_images[i])
      textureArrayRight.push(texture)
    }

    let animatedSpriteXiaoxin = new PIXI.AnimatedSprite(textureArrayRight)

    animatedSpriteXiaoxin.animationSpeed = 0.1
    animatedSpriteXiaoxin.y = 484
    animatedSpriteXiaoxin.x = 50

    function setup () {

      // TODO: 这里可以将addChild循环调用，通过传入bulidsJson，解析scale、坐标、url路径来加载图片代码；提示：reduce

      // 将建筑添加到建筑群组中
      builds = new PIXI.Container()

      bulidsJson.forEach(element => {
        let currBuildSprite
        currBuildSprite = new Sprite(resources[element.img_url].texture)
        currBuildSprite.scale.x = element.scale
        currBuildSprite.scale.y = element.scale
        currBuildSprite.x = element.x
        currBuildSprite.y = element.y
        builds.addChild(currBuildSprite)
      })
      let groundJson = backgroundsJson[0]
      ground = new TilingSprite(resources[groundJson.img_url].texture,
        groundJson.width, groundJson.height)
      let woodsJson = backgroundsJson[1]
      woods = new TilingSprite(resources[woodsJson.img_url].texture,
        woodsJson.width, woodsJson.height)

      ground.y = woodsJson.height - groundJson.height

      let ticker = PIXI.Ticker.shared

      ticker.addOnce(() => {
        console.log('小新变身！')
      })
      // 碰撞属性
      // 由于动画效果是，人物不动，景动，所以调用第五个参数为true改为全局坐标检测

      // TODO：性能优化：把60fps的动画持续 变成只有play()时使用

      // 右键
      let keyRight = keyboard(39)
      keyRight.press = () => {
        // 北景左移
        // ticker = app.ticker;

        // 右键动画
        ticker.add(handleKeyPressRight)

        //碰撞检测
        ticker.add(returnHitTestTicker)

        //小新向右跑的动画
        animatedSpriteXiaoxin.scale = xiaoxin.rightSet.scale
        animatedSpriteXiaoxin.pivot = xiaoxin.rightSet.pivot
        animatedSpriteXiaoxin.play()

      }
      keyRight.release = () => {
        ticker.remove(handleKeyPressRight)
        ticker.remove(returnHitTestTicker)
        animatedSpriteXiaoxin.stop()

      }

      // 左键
      let keyLeft = keyboard(37)
      keyLeft.press = () => {
        // ticker = app.ticker;
        ticker.add(handleKeyPressLeft)
        ticker.add(returnHitTestTicker)

        animatedSpriteXiaoxin.scale = xiaoxin.leftSet.scale
        animatedSpriteXiaoxin.pivot = xiaoxin.leftSet.pivot
        animatedSpriteXiaoxin.play()

      }
      keyLeft.release = () => {
        ticker.remove(handleKeyPressLeft)
        ticker.remove(returnHitTestTicker)
        animatedSpriteXiaoxin.stop()
      }

      app.stage.addChild(woods, builds, ground, animatedSpriteXiaoxin)

    }

    function returnHitTestTicker (delta) {
      hitTestTicker(delta, bump, animatedSpriteXiaoxin, builds)
    }

  }, [])

// 右键控制
  function handleKeyPressRight (delta) {
    ground.tilePosition.x -= backgroundsJson[0].vx
    woods.tilePosition.x -= backgroundsJson[1].vx

    // TODO: 先调高速度 便于调试 后面将速度复原（注释解掉即可）
    // builds.x -= backgroundsJson[0].vx
    builds.x -= 10
  }

// 左键控制
  function handleKeyPressLeft (delta) {
    ground.tilePosition.x += backgroundsJson[0].vx
    woods.tilePosition.x += backgroundsJson[1].vx

    builds.x += backgroundsJson[0].vx
  }

  return (<div>
    <div id={'gamepine'}/>
  </div>)
}

export default GamePine
