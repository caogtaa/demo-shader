// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import RainRenderComponent from "./RainRenderComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ScreenShotRain extends cc.Component {
    @property({
        type: RainRenderComponent
    })
    renderComponent: RainRenderComponent = null;

    @property(cc.Node)
    btnTest: cc.Node = null;

    @property({
        type: cc.Texture2D
    })
    textureToReplace: cc.Texture2D = null;

    _time = 0;
    _material = null;
    _texture = null;

    onLoad() {
        let that = this;
        let rendererComponent = this.renderComponent;
        this.btnTest.on(cc.Node.EventType.TOUCH_END, () => {
            that.RenderOnce();
        });
    }

    protected RenderOnce() {
        var that = this;
        cc.loader.loadRes("image/girl", cc.Texture2D, function (err, result) {
            let material = that.renderComponent.getMaterial(0);
            material.setProperty('texture', result);
            // self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });

        

        // let node = new cc.Node();
        // node.parent = cc.director.getScene();
        // // let camera = node.addComponent(cc.Camera);
        // // 设置你想要的截图内容的 cullingMask
        // // camera.cullingMask = 0xffffffff;
        // let camera = cc.Camera.main;

        // // 新建一个 RenderTexture，并且设置 camera 的 targetTexture 为新建的 RenderTexture，这样 camera 的内容将会渲染到新建的 RenderTexture 中。
        // let texture = new cc.RenderTexture();
        // let gl = cc.game._renderContext;
        // // 如果截图内容中不包含 Mask 组件，可以不用传递第三个参数
        // texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height);//, gl.STENCIL_INDEX8);
        // let oldTargetTexture = camera.targetTexture;
        // camera.targetTexture = texture;

        // // 渲染一次摄像机，即更新一次内容到 RenderTexture 中
        // camera.render();
        // this._texture = texture;
        
        // material.setProperty('texture', texture);

        // camera.targetTexture = oldTargetTexture;
    }

    onEnable() {
        this._material = this.renderComponent.getMaterial(0);
    }
    update(dt) {
        if (this.node.active && this._material) {
            this.setTime(dt);
        }
    }
    setTime(dt) {
        this._time += dt;
        if (this._time >= 1000) {
            this._time = 0;
        }
        this._material.setProperty('time', this._time);
    }
}
