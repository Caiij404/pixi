import * as PIXI from 'pixi.js'

let GUID = 11044766;

export class Line{
    private line: PIXI.Sprite
    public status: 'creating' | 'created' = 'creating'
    public id: string;
    private creatingMotion: any;
    private button2CancelCreate: any;
    private keyCancelCreate: any;
    constructor(){
        const texture = PIXI.Texture.from('./line.jpg');
        this.line = new PIXI.Sprite(texture);
        this.line.anchor.set(0.5);
        this.line.scale.set(0.5,0.5)
        // @ts-ignore
        this.line.eventMode = 'none';
        this.id = GUID.toString();
        GUID++;

    }
    get position():PIXI.IPointData{
        return this.line.position.clone();
    }
    translate(x: number, y: number){
        this.line.position.set(x, y);
    }
    setScale(x: number, y: number){
        this.line.scale.set(x, y);
    }
    getSprite():PIXI.Sprite{
        return this.line;
    }
    destroy(){
        if(!this.line.destroyed)
        {
            this.line.destroy();
        }
    }

    confirmCreate(){

        let lSprite = this.getSprite();
        let oldx = lSprite.scale.x;
        let oldy = lSprite.scale.y;
        oldx *= 0.2;
        oldy *= 0.55;
        this.line.texture = PIXI.Texture.from('./line1.jpg')
        this.setScale(oldx, oldy);
    }

    get destroyed():boolean{
        return this.line.destroyed;
    }
}