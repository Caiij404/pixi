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

        this.creatingMotion = (e: MouseEvent) => {
            let mousePoint = [e.clientX, e.clientY];
            let original = [window.innerWidth / 2, window.innerHeight / 2];
            let move = [mousePoint[0] - original[0], mousePoint[1] - original[1]];
            if(!this.destroyed)
            {
                this.line.position.set(move[0], move[1]);
            }
        }

        this.button2CancelCreate = (e: MouseEvent) => {
            if(e.button == 2 && !this.line.destroyed)
            {
                console.log('Cancel Create Line By Button2');
                this.line.destroy();
                window.removeEventListener('mousemove',this.creatingMotion);
            }
        }

        this.keyCancelCreate = (e: KeyboardEvent)=>{
            if(e.key == 'Escape' && !this.line.destroyed)
            {
                console.log('Cancel Create Line By Key Escape');
                this.line.destroy();
                window.removeEventListener('mousemove',this.creatingMotion);
            }
        }

        if(this.status === 'creating')
        {
            window.addEventListener('mousemove',this.creatingMotion);
            window.addEventListener('mousedown',this.button2CancelCreate);
            window.addEventListener('keydown',this.keyCancelCreate);
        }
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

    get destroyed():boolean{
        return this.line.destroyed;
    }
}