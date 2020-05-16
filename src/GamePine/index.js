// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import * as PIXI from 'pixi.js'
import {
  keyboard
} from './utils'
import Bump from './bump'

function GamePine (props) {
  const [initSetting] = useState({

    backwoodsColor: '0x061639',
    width: 1286,
    height: 640

  })
  const [xiaoxin] = useState({
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
      scale: {
        x: -1,
        y: 1
      },
      pivot: {
        x: 83,
        y: 0
      }
    },
    rightSet: {
      scale: {
        x: 1,
        y: 1
      },
      pivot: {
        x: 0,
        y: 0
      }
    }
  })
  const [backgroundsJson] = useState([
    {
      img_url: 'images/ground2.png',
      width: 1286,
      height: 66,
      vx: 3
    },
    {
      img_url: 'images/background.png',
      width: 1286,
      height: 640,
      vx: 1.5
    }
  ])
  const [bulidsJson] = useState([
    {
      id: 1,
      date: 1998,
      title: '万圣节凌晨！小鬼降世！',
      detail: '告别牛头马面，礼让黑白无常，独自悠哉在奈何桥边，一碗孟婆汤，一盏南瓜灯，天时，地利，人和，踏进重生之门，独闯万圣月夜。雨夜潮暗，风鸣电闪，凌晨钟声，小鬼降世人间。毛孩骇人，名曰一恒，父母慈爱，潜心抚安，欲知后事，待君且看……',
      img_url: 'images/hospital.png',
      scale: 0.7,
      x: 200,
      y: 284
    },
    {
      id: 2,
      date: 2017,
      title: '中学：典型反派人物！',
      detail: '私办6张不同的饭卡以应对分年纪吃饭的策略；每周末3小时放假时间，2小时用来打游戏；一沓请假条只为了中午能吃上路边肉夹馍；认的10个妹妹+2个秘书可谓一段佳话；凭借一手PPT技术经常办公室乘凉；利用老师们信息不对称的漏洞，给自己调了体育课程；嫌弃老师随机点名不公平，做了一个点名器造福人民；每天保证10小时的睡眠时间，决不亏欠自己;真实水平的物理成绩最高时全校第一，最低14分；每天学控梦，研究出了一套入睡和控梦的方法；偶尔半夜打鸡血，写个八千余字的人生感悟……',
      img_url: 'images/middle-school.png',
      scale: 1.2,
      x: 800,
      y: 199
    },
    {
      id: 3,
      date: 2017,
      title: '初饮C语言，醉美醉痴迷',
      detail: '难得混完高中，开始追求更鬼的目标："牛掰且有钱"。决定以后从事IT，那么就从C语言入门：从变量到循环，从结构体到指针，一直到"天下第一武道会"的英雄循环攻击的控制台版游戏。说生生的人，就这样腻在代码里，一去不复返……',
      img_url: 'images/c.png',
      scale: 2,
      x: 1900,
      y: 464
    },
    {
      id: 4,
      date: 2017,
      title: '大学，走上玩程序的不归路',
      detail: '编程魅力太大，每天陷入刷题不可自拔，每一次AC都能高兴老半天。每当军训结束后，就急着赶回宿舍去做两道编程题，后来军事理论就挂科了（捂脸），从此开启了"日常编程，考前突击"的两步走战略，极大提高了我军的灵活度。',
      img_url: 'images/university.png',
      scale: 0.3,
      x: 2200,
      y: 314
    },
    {
      id: 5,
      date: 2017,
      title: '脱单！追上女神！',
      detail: '通过坚持不懈地死缠烂打和软磨硬泡，在10月10日的凌晨，表白成功，追上调皮可爱的小仙女一枚。一沓子火车汽车票，一份痴心真感情，一念郑州，一念洛阳，一段异地恋就此展开……',
      img_url: 'images/inLove.png',
      scale: 0.4,
      x: 2700,
      y: 369
    },
    {
      id: 6,
      date: 2017,
      title: '加入校级软件实验室',
      detail: '"创新基地"乃校级软件实验室，凭借一手c语言功底，成功入围，吸收比较进步的思维和知识。通过在团队的生活，让自己对"开发者"有了更进一步的了解，加入实验室是自己未来从事开发职业非常重要的一环，在这里得到了很多的成长。',
      img_url: 'images/joinGroup.png',
      scale: 1,
      x: 3200,
      y: 362
    },
    {
      id: 7,
      date: 2018,
      title: '我去！前端贼有意思！',
      detail: '在做Java-Swing桌面图形界面的时候，发现了自己对View/UI层的痴迷，随着后续对Html/CSS的了解，越来越发现自己喜欢这一方向，于是开始筹备自己成为一名"靠谱的前端工程师"的计划……',
      img_url: 'images/definedGoal.png',
      scale: 1,
      x: 3850,
      y: 304
    },
    {
      id: 8,
      date: 2018,
      title: '晋升实验室负责人',
      detail: '有幸得到赏识，被提拔为实验室负责人。任职期间，带领实验室成员拿下国家级和省级奖项20+，并组织开发了实验室首个信息化管理平台的初版，丰富了实验室的管理模式，细化了一些管理方案并总结成文档。',
      img_url: 'images/groupLeader.png',
      scale: 0.5,
      x: 4400,
      y: 384
    },
    {
      id: 9,
      date: 2019,
      title: '创业产品-护驾行',
      detail: '偶然刷到"疲劳驾驶"的短视频，了解到它对危害性和出事率，试想研发一款产品，经过市场调研，评估市场竞争力和需求程度，确定了"基于人脸检测的软硬件分离架构方案"，并命名为"护驾行"，让自己以产品经理的视角打磨一款新产品。其中技术获得大学生创新训练技术国家级重点立项，并拿到互联网+二等奖。',
      img_url: 'images/production_hujiaxing.png',
      scale: 0.3,
      x: 5000,
      y: 489
    },
    {
      id: 10,
      date: 2019,
      title: '处女座《CanvasStudy》',
      detail: '闭眼冥想，总有一丝悸动在心中若隐若现，拂开雾纱，那是曾经学习过程中略过的Canvas，最后还是放不下它。于是，展开了对Canvas的学习，为了保持头脑清醒和养成总结的习惯，开设了《CanvasStudy》的专栏，并在半年内访问量过万，并持续更新中',
      img_url: 'images/canvasStudy.png',
      scale: 0.8,
      x: 5300,
      y: 319
    },
    {
      id: 10,
      date: 2020,
      title: '入职-墨刀',
      detail: '在2020的这场疫情风暴下，通过了墨刀的面试并成功入职。2018年，开发软件时使用墨刀，2020年，成为墨刀的开发人员。在这个二十余人的团队里，创造了将近200万用户的C端产品。通过在内部的工作经验，这个团队有着很强的创造力，能够造有商业价值的"轮子"。',
      img_url: 'images/modao.png',
      scale: 0.5,
      x: 5700,
      y: 469
    },
    {
      id: 11,
      date: 2020,
      title: '斩获腾讯、阿里offers',
      detail: '在2020春招这场战争中，作为大三学生的我，拿下了腾讯、阿里等公司的暑期实习offer，深思熟虑比较之后，放弃了高转正率的阿里转而拥抱了腾讯。在这个春招过程中，深刻认识到"意识"的重要性，也明白了"战场是新兵成长最快的地方"。',
      img_url: 'images/summerOffers.png',
      scale: 0.5,
      x: 6300,
      y: 364
    },
    {
      id: 12,
      date: 2021,
      title: '未来可期',
      detail: '钱多事少离家近可谓是所有人的未来期待，钱可以通过做事来创造，离家距离掌握在自己手上，挣哗啦啦的钱，买离公司不远的家，也是很实在了哈哈哈。自己对各种类型的知识都持有极大的兴趣，对有趣的知识有着无限的渴望，至少能感受到自己能在这条路上越走越远，至于未来到哪一步，待君且看……',
      img_url: 'images/succeed.png',
      scale: 0.5,
      x: 6780,
      y: 174
    }
  ])

  // 引入核心PIXI模块
  const Application = PIXI.Application
  const loader = PIXI.Loader.shared
  const resources = PIXI.Loader.shared.resources
  const Sprite = PIXI.Sprite
  const TilingSprite = PIXI.TilingSprite
  const Container = PIXI.Container
  const TextStyle = PIXI.TextStyle
  const Graphics = PIXI.Graphics
  const Text = PIXI.Text
  const AnimatedSprite = PIXI.AnimatedSprite
  const Texture = PIXI.Texture
  const Ticker = PIXI.Ticker

  // 当前碰撞建筑
  let currHitBuild = 'none'
  let ground
  let woods// 背景
  let builds// 建筑群

  // 初始化
  useEffect(() => {
    const app = new Application(initSetting)
    document.getElementById('gamePine').appendChild(app.view)
    console.log('props', props)
    // 将canvas和容器尺寸匹配
    document.querySelector(
      '#gamePine canvas').style = `zoom:${props.width /
    initSetting.width}`

    const bump = new Bump(PIXI)// 碰撞对象

    // 添加进度加载表示
    const progressPine = new Container()
    progressPine.zIndex = 1000
    const grogressPineBackground = new Graphics()
    grogressPineBackground.beginFill(0x000000)
    grogressPineBackground.drawRect(0, 0, initSetting.width,
      initSetting.height)
    grogressPineBackground.endFill()
    progressPine.addChild(grogressPineBackground)

    const progressStyle = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fill: 'white',
      stroke: '#ff3300',
      strokeThickness: 4,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6
    })

    // 进度条
    const progressMessage = new Text('0%', progressStyle)
    progressMessage.y = initSetting.height / 2
    progressMessage.x = initSetting.width / 2
    progressMessage.anchor.set(0.5)

    progressPine.addChild(progressMessage)

    // 设置可排序
    app.stage.sortableChildren = true
    app.stage.addChild(progressPine)

    // 创建一个文字描述的面板
    const detailsPine = new Container()
    detailsPine.zIndex = 1001
    detailsPine.x = 30

    // details列表
    const yearsStyle = new TextStyle({
      dropShadow: true,
      dropShadowAlpha: 0.9,
      dropShadowBlur: 3,
      dropShadowColor: '#aeaeae',
      fontFamily: '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
      fontSize: 80
    })
    // 时间
    const yearsText = new Text('🎮', yearsStyle)
    detailsPine.addChild(yearsText)

    const titleStyle = new TextStyle({
      dropShadow: true,
      dropShadowAlpha: 0.9,
      dropShadowBlur: 3,
      dropShadowColor: '#aeaeae',
      fontFamily: '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
      fontSize: 55
    })
    const titleText = new Text('游戏说明', titleStyle)
    titleText.x = 310
    titleText.y = 10

    detailsPine.addChild(titleText)

    const detailsStyle = new TextStyle({
      dropShadow: true,
      dropShadowAlpha: 0.9,
      dropShadowBlur: 3,
      dropShadowColor: '#aeaeae',
      fontFamily: '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
      fontSize: 27,
      wordWrap: true,
      wordWrapWidth: 900,
      breakWords: true
    })
    // PIXI不支持首行缩进，前空格也会被清除，这里用两个空字符替代
    const detailsText = new Text('通过键盘左右键控制蜡笔小新移动，按压代表行动，松开即可暂停，来瞧瞧我的人生轨迹。',
      detailsStyle)
    detailsText.x = 310
    detailsText.y = 80
    detailsPine.addChild(detailsText)

    const textElements = {
      yearsText,
      detailsText,
      titleText,
      detailsPine
    }

    app.stage.addChild(detailsPine)

    // 资源列表
    const resourcesUrl = []
    bulidsJson.forEach(element => {
      // 将所有的图片资源添加到resourcesUrl数组中
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

    loader.on('progress', loadProgressHandler)
      .load(setup)

    // 进度条
    function loadProgressHandler (loader, resource) {
      const currProgressNumber = loader.progress.toFixed(2)
      // 更新进度条
      progressMessage.text = currProgressNumber + '%'
      if (currProgressNumber >= 100) {
        setTimeout(() => {
          progressPine.visible = false
        }, 500)
      }
    }

    // 小新的纹理数组
    const textureArrayRight = []
    for (let i = 0; i < 6; i++) {
      const texture = Texture.from(xiaoxin.run_images[i])
      textureArrayRight.push(texture)
    }
    const animatedSpriteXiaoxin = new AnimatedSprite(textureArrayRight)
    animatedSpriteXiaoxin.animationSpeed = 0.1
    animatedSpriteXiaoxin.y = 484
    animatedSpriteXiaoxin.x = 50

    // 游戏执行
    function setup () {
      // 将建筑添加到建筑群组中
      builds = new Container()
      bulidsJson.forEach(element => {
        const currBuildSprite = new Sprite(resources[element.img_url].texture)
        currBuildSprite.scale.x = element.scale
        currBuildSprite.scale.y = element.scale
        currBuildSprite.x = element.x
        currBuildSprite.y = element.y
        builds.addChild(currBuildSprite)
      })
      const groundJson = backgroundsJson[0]
      ground = new TilingSprite(resources[groundJson.img_url].texture,
        groundJson.width, groundJson.height)
      const woodsJson = backgroundsJson[1]
      woods = new TilingSprite(resources[woodsJson.img_url].texture,
        woodsJson.width, woodsJson.height)
      ground.y = woodsJson.height - groundJson.height

      const ticker = Ticker.shared

      // 右键按压
      const keyRight = keyboard(39)
      keyRight.press = () => {
        // 背景左移

        // 右键动画
        ticker.add(handleKeyPressRight)

        // 碰撞检测
        ticker.add(returnHitTestTicker)

        // 小新向右跑的动画
        animatedSpriteXiaoxin.scale = xiaoxin.rightSet.scale
        animatedSpriteXiaoxin.pivot = xiaoxin.rightSet.pivot
        animatedSpriteXiaoxin.play()
      }

      // 右键释放
      keyRight.release = () => {
        ticker.remove(handleKeyPressRight)
        ticker.remove(returnHitTestTicker)
        animatedSpriteXiaoxin.stop()
      }

      // 左键按压
      const keyLeft = keyboard(37)
      keyLeft.press = () => {
        // ticker = app.ticker;
        ticker.add(handleKeyPressLeft)
        ticker.add(returnHitTestTicker)

        animatedSpriteXiaoxin.scale = xiaoxin.leftSet.scale
        animatedSpriteXiaoxin.pivot = xiaoxin.leftSet.pivot
        animatedSpriteXiaoxin.play()
      }

      // 左键释放
      keyLeft.release = () => {
        ticker.remove(handleKeyPressLeft)
        ticker.remove(returnHitTestTicker)
        animatedSpriteXiaoxin.stop()
      }

      app.stage.addChild(woods, builds, ground, animatedSpriteXiaoxin)
    }

    function returnHitTestTicker (delta) {
      hitTestTicker(delta, bump, animatedSpriteXiaoxin, builds, textElements)
    }
  }, [])

  // 右键控制
  function handleKeyPressRight (delta) {
    ground.tilePosition.x -= backgroundsJson[0].vx
    woods.tilePosition.x -= backgroundsJson[1].vx

    builds.x -= backgroundsJson[0].vx
  }

  // 左键控制
  function handleKeyPressLeft (delta) {
    ground.tilePosition.x += backgroundsJson[0].vx
    woods.tilePosition.x += backgroundsJson[1].vx

    builds.x += backgroundsJson[0].vx
  }

  function hitTestTicker (delta, Bump, sprite, sprites, textElements) {
    const { yearsText, detailsText, titleText } = textElements

    // 获得子精灵数组
    const spriteChildren = sprites.children
    spriteChildren.forEach(element => {
      // 当前元素/图片/资源名
      const currName = element.texture.textureCacheIds[0]
      if (currHitBuild !== currName) {
        // 碰撞属性
        // 由于动画效果是，人物不动，景动，所以调用第五个参数为true改为全局坐标检测
        if (Bump.hit(element, sprite, false, false, true)) {
          currHitBuild = currName
          // 找到对应的建筑并展示相关说明
          bulidsJson.forEach(element => {
            if (element.img_url === currName) {
              detailsText.text = '⠀⠀' + element.detail
              titleText.text = element.title
              yearsText.text = element.date
            }
          })
        }
      }
    })
  }

  return (
    <div id={'gamePine'} style={{
      width: props.width,
      display: 'inline-block'
    }}/>
  )
}

export default GamePine
