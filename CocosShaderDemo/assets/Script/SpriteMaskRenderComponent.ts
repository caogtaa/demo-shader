const {ccclass, property} = cc._decorator;
import CustomAssembler from './CustomAssembler'

@ccclass
export default class SpriteMaskRenderComponent extends cc.RenderComponent {
    @property({
        type: cc.Texture2D
    })
    maskTexture: cc.Texture2D = null;

    @property({
    })
    bgOffset: cc.Vec2 = cc.v2(0, 0);

    @property({
    })
    bgSize: cc.Vec2 = cc.v2(1, 1);

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
        if (this.maskTexture) {
            material.setProperty('maskTexture', this.maskTexture);
        }

        material.setProperty('bgOffset', this.bgOffset);
        material.setProperty('bgSize', this.bgSize);

        this.setMaterial(0, material);
        this.markForRender(true);
    }
}
