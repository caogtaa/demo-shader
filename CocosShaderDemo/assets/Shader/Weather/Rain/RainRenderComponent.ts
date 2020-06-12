const {ccclass, property} = cc._decorator;
import CustomAssembler from '../../../Script/CustomAssembler'

@ccclass
export default class RainRenderComponent extends cc.RenderComponent {
    @property({
        type: cc.Texture2D
    })
    maskTexture: cc.Texture2D = null;

    _texture = null;

    // @property({
    // })
    // bgOffset: cc.Vec2 = cc.v2(0, 0);

    // @property({
    // })
    // bgSize: cc.Vec2 = cc.v2(1, 1);

    onEnable () {
        super.onEnable();
        this._activateMaterial();
    }

    //override
    _resetAssembler () {
        this.setVertsDirty(true);
        this._assembler = new CustomAssembler();
        this._assembler.init(this);
    }

    //override
    _activateMaterial () {
        let material = this.sharedMaterials[0];
        if (!material) {
            this.disableRender();
            return;
        }
        
        material = cc.Material.getInstantiatedMaterial(material, this);

        
        // 运行时会经过这里，不要写这里
        // let node = new cc.Node();
        // node.parent = cc.director.getScene();
        // let camera = node.addComponent(cc.Camera);
        // let texture = new cc.RenderTexture();
        // let gl = cc.game._renderContext;
        // // 如果截图内容中不包含 Mask 组件，可以不用传递第三个参数
        // texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, gl.STENCIL_INDEX8);
        // camera.targetTexture = texture;

        // // 渲染一次摄像机，即更新一次内容到 RenderTexture 中
        // camera.render();
        // this._texture = texture;
        // material.setProperty('texture', texture);


        // if (this.maskTexture) {
        //     material.setProperty('maskTexture', this.maskTexture);
        // }

        // material.setProperty('bgOffset', this.bgOffset);
        // material.setProperty('bgSize', this.bgSize);

        this.setMaterial(0, material);
        this.markForRender(true);
    }
}
