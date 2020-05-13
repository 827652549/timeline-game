/**
 * 键盘监听
 * @param keyCode
 */
export function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}

// 碰撞检测函数
export function hitTestTicker (delta, Bump, sprite, sprites) {
  // 获得子精灵数组
  const spriteChildren = sprites.children
  spriteChildren.forEach(element => {
    // 当前元素/图片/资源名
    const currName = element.texture.textureCacheIds[0]
    // switch
    // console.log(Bump.hit(element,sprite,false,false,true));
  })
}


