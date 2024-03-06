import * as PIXI from 'pixi.js'
import { EditorService } from './EditorService';

let GUID = 11044766;

export class Line{
    private line: PIXI.Sprite
    public status: 'creating' | 'created' = 'creating'
    public id: string = '';
    public zoneMark = '';

    private onDragStart: (e: MouseEvent) => void;
    private onDragMove: (e: MouseEvent) => void;
    private onDragEnd: (e: MouseEvent) => void;
    constructor(){
        const texture = PIXI.Texture.from('./line.jpg');
        this.line = new PIXI.Sprite(texture);
        this.line.anchor.set(0.5);
        this.line.scale.set(0.5,0.5)
        // @ts-ignore
        this.line.eventMode = 'none';
        // @ts-ignore
        this.line.hitArea = EditorService.get().getApp().screen;

        this.onDragStart = (e: MouseEvent)=>{
            if(this.line.destroyed)
                return ;
            // @ts-ignore
            this.line.on('pointermove',this.onDragMove,this.line)
            this.line.alpha = 0.5;
        }

        this.onDragMove = (e: MouseEvent)=>{
            if(this.line.destroyed)
                return;

            // this.line.position.set(e.clientX, e.clientY);
            let mousePoint = [e.clientX, e.clientY];
            let original = [window.innerWidth / 2, window.innerHeight / 2];
            let move = [mousePoint[0] - original[0], mousePoint[1] - original[1]];
            if(this.line && !this.line.destroyed)
            {
                this.line.position.set(move[0], move[1]);
            }
        }

        this.onDragEnd = (/* e: MouseEvent */)=>{
            if(this.line.destroyed)
                return ;
            // @ts-ignore
            this.line.off('pointermove',this.onDragMove,this.line)
        }

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

    confirmCreate(mark: string){

        let lSprite = this.getSprite();
        let oldx = lSprite.scale.x;
        let oldy = lSprite.scale.y;
        oldx *= 0.2;
        oldy *= 0.55;
        this.line.texture = PIXI.Texture.from('./line1.jpg')
        this.setScale(oldx, oldy);

        this.zoneMark = mark;
        
        // 这个eventMode老是会忘
        // @ts-ignore
        this.line.eventMode = 'static'
        // @ts-ignore
        this.line.on('pointerdown',this.onDragStart,this.line);
    }

    get destroyed():boolean{
        return this.line.destroyed;
    }
}