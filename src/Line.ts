import * as PIXI from 'pixi.js';
import { PixiGraphics } from './PixiGraphics';
import { EditorService } from './EditorService';
import { ZoneManager } from './ZoneManager';

let GUID = 11044766;
let linew1 = 90;
let lineh1 = 90
let linew2 = 25;
let lineh2 = 50;

export class Line{
    private id: string = '';
    private container: PIXI.Container;
    private sprite: PIXI.Sprite;
    private mask: PIXI.Graphics;
    private box: PIXI.Graphics;

    public mark = '';
    private pointerDown: (e: MouseEvent) => void;
    private pointerUp: (e: MouseEvent) => void;
    private globalMouseMove: (e: MouseEvent) => void;

    constructor(url: string = './line.jpg'){
        let texture = PIXI.Texture.from(url)
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.width = linew1;
        this.sprite.height = lineh1;

        this.box = new PIXI.Graphics();
        
        this.id = GUID.toString()
        GUID++;

        this.container = new PIXI.Container();
        this.container.sortableChildren = true;
        this.sprite.zIndex = 2;
        this.container.addChild(this.sprite);
        // this.box.zIndex = 3;
        // this.container.addChild(this.box);
        
        this.mask = new PIXI.Graphics();

        this.pointerDown = (e: MouseEvent) => {
            // @ts-ignore
            this.container.on("globalmousemove",this.globalMouseMove);
            ZoneManager.get().showRange(this.mark);
        }

        this.pointerUp = (e: MouseEvent) => {
            // @ts-ignore
            this.container.off('globalmousemove',this.globalMouseMove);
            ZoneManager.get().hideRange();
        }

        this.globalMouseMove = (e: any)=>{
            let mouseX = e.data.global.x;
            let mouseY = e.data.global.y;

            let stage = EditorService.get().getStage();
            let x = stage.position.x;
            let y = stage.position.y;
            mouseX -= x;
            mouseY -= y;

            let range = ZoneManager.get().getMoveRange(this.mark);
            let minx = range.minx;
            let maxx = range.maxx;
            let miny = range.miny;
            let maxy = range.maxy;

            if(mouseX < minx){
                mouseX = minx;
            }
            if(mouseX > maxx - this.sprite.width){
                mouseX = maxx - this.sprite.width;
            }
            if(mouseY < miny){
                mouseY = miny;
            }
            if(mouseY > maxy - this.sprite.height){
                mouseY = maxy - this.sprite.height;
            }

            this.translate(mouseX,mouseY);
        }

        // @ts-ignore
        this.container.on('pointerdown',this.pointerDown);
        // @ts-ignore
        this.container.on('pointerup',this.pointerUp);
        // @ts-ignore
        this.container.on('pointerupoutside',this.pointerUp)
        
        EditorService.get().getStage().addChild(this.container);
    }

    getLine():PIXI.Container{
        return this.container;
    }

    createDashBox(w: number, h:number){
        this.box.destroy();
        let x = this.sprite.position.x;
        let y = this.sprite.position.y;
        let color = 0xb1b1b1;
        switch(this.mark)
        {
            case 'zone1':
                {
                    color = 0xff5436;
                    break;
                }
            case 'zone2': 
                {
                    color = 0xa999ff;
                    break;
                }
            case 'zone3':
                {
                    color = 0x0acca2;
                    break;
                }
        }
        let style = {
            width: 1,
            color: color,
            alpha: 0.8,
        }
        this.box = PixiGraphics.get().drawDashRectangle(0,0,w,h,style);
        this.box.position.set(x,y)
        this.container.addChild(this.box);
        this.box.zIndex = 3
    }

    confirmCreate(mark: string, data?:any){
        this.mark = mark;

        this.sprite.width = linew2;
        this.sprite.height = lineh2;

        this.createDashBox(linew2,lineh2);

        if(data)
        {
            let position: PIXI.IPointData = data.position
            if(position)
            {
                this.translate(position.x, position.y);
            }
        }

        // @ts-ignore
        this.container.eventMode = 'static'
        // @ts-ignore
        this.container.on('pointerdown',this.pointerDown);
    }

    get destroyed():boolean{
        return this.container.destroyed;
    }

    destroy(){
        EditorService.get().getStage().removeChild(this.container)
        this.container.destroy();
    }

    translate(x: number, y:number){
        this.sprite.position.set(x,y);
        this.box.position.set(x,y);
    }

    get position(): PIXI.IPointData{
        return this.sprite.position.clone();
    }
}