import * as PIXI from 'pixi.js';
import { PixiGraphics } from './PixiGraphics';
import { EditorService } from './EditorService';

let linew1 = 90;
let lineh1 = 90
let linew2 = 25;
let lineh2 = 50;

export class Line{
    private container: PIXI.Container;
    private sprite: PIXI.Sprite;
    private mask: PIXI.Graphics;
    private box: PIXI.Graphics;

    public zoneMark = '';
    private pointerDown: (e: MouseEvent) => void;
    private pointerUp: (e: MouseEvent) => void;
    private globalMouseMove: (e: MouseEvent) => void;

    constructor(url: string = './line.jpg'){
        let texture = PIXI.Texture.from(url)
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.width = linew1;
        this.sprite.height = lineh1;

        let style = {
            width: 2,
            color: 0xff5436,
            alpha: 1,
        }
        // this.box = PixiGraphics.get().drawDashRectangle(0,0,this.sprite.width,this.sprite.height,style);
        this.box = PixiGraphics.get().drawDashRectangle(0,0,linew1,lineh1,style);
        
        this.container = new PIXI.Container();
        this.container.sortableChildren = true;
        this.sprite.zIndex = 2;
        this.box.zIndex = 3;
        this.container.addChild(this.sprite);
        this.container.addChild(this.box);
        
        this.mask = new PIXI.Graphics();

        this.pointerDown = (e: MouseEvent) => {
            // @ts-ignore
            this.container.on("globalmousemove",this.globalMouseMove);
        }

        this.pointerUp = (e: MouseEvent) => {
            // @ts-ignore
            this.container.off('globalmousemove',this.globalMouseMove);
        }

        this.globalMouseMove = (e: any)=>{
            let mouseX = e.data.global.x;
            let mouseY = e.data.global.y;

            let stage = EditorService.get().getStage();
            let x = stage.position.x;
            let y = stage.position.y;
            mouseX -= x;
            mouseY -= y;

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
        let style = {
            width: 2,
            color: 0xff5436,
            alpha: 0.8,
        }
        this.box = PixiGraphics.get().drawDashRectangle(0,0,w,h,style);
        this.box.position.set(x,y)
        this.container.addChild(this.box);
        this.box.zIndex = 3
    }

    confirmCreate(mark: string){
        this.zoneMark = mark;

        this.sprite.width = linew2;
        this.sprite.height = lineh2;

        this.createDashBox(linew2,lineh2);

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
        return this.container.position.clone();
    }
}