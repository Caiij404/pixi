import * as PIXI from 'pixi.js'

let GUID = 11044766;

export class Line{
    private line: PIXI.Sprite
    public id: string;
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
    set position(p: PIXI.IPointData){
        this.line.position = p;
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
}