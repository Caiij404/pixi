import * as PIXI from 'pixi.js'
import { StatusManager } from './StatusManager';
import { PixiGraphics } from './PixiGraphics';

const showAlpha = 1;
const hideAlpha = 0;
export class ZoneManager {
    private zone1: PIXI.Container;
    private zone2: PIXI.Container;
    private zone3: PIXI.Container;
    private statusManager: StatusManager;

    // private movingRange1: PIXI.Graphics;
    // private movingRange2: PIXI.Graphics;
    // private movingRange3: PIXI.Graphics;

    private stage: PIXI.Container;

    // private static instance: ZoneManager;
    constructor(stage: PIXI.Container) {
        this.stage = stage;
        this.statusManager = StatusManager.get();

        this.zone1 = this.createZone("zone1");
        this.zone2 = this.createZone("zone2");
        this.zone3 = this.createZone("zone3");

        this.stage.addChild(this.zone1)
        this.stage.addChild(this.zone2)
        this.stage.addChild(this.zone3)
    }

    private createZone(mark: string): PIXI.Container {

        let container = new PIXI.Container();
        
        let lineStyle: any = {};
        lineStyle.width = 2;
        lineStyle.alpha = showAlpha;
        lineStyle.color = 0xb1b1b1;
        let size = [0, 0];
        let pivot = [0, 0];
        if (mark == 'zone1') {
            pivot = [80, 0];
            size = [80, 50];
        }
        else if (mark == 'zone2') {
            pivot = [0, 50];
            size = [80, 50];
        }
        else if (mark == 'zone3') {
            pivot = [0, 300];
            size = [80, 80];
        }

        let dashLine = PixiGraphics.get().drawDashRectangle(0, 0, size[0], size[1], lineStyle);

        let zone = new PIXI.Graphics();
        zone.lineStyle(lineStyle.width, lineStyle.color, 0);
        zone.beginFill(0x000000);
        zone.drawRect(0,0,size[0],size[1]);
        zone.endFill();
        zone.alpha = 0;

        dashLine.pivot.set(pivot[0], pivot[1]);
        zone.pivot.set(pivot[0], pivot[1]);

        // @ts-ignore
        zone.eventMode = 'static';

        const pointerOver = () => {
            // @ts-ignore
            if(dashLine.isVisible())
            {
                this.statusManager.setHoverZone(mark);
                console.log(mark, 'over');
            }
        }
        const pointerOut = () => {
            // @ts-ignore
            if(dashLine.isVisible())
            {
                this.statusManager.setHoverZone();
                console.log(mark, 'out');
            }
        }
        const onClick = () => {
            //@ts-ignore
            if(dashLine.isVisible())
            {
                console.log(mark, 'onClick');
            }
        }

        // @ts-ignore
        zone.on('pointerover', pointerOver, zone);
        // @ts-ignore
        zone.on('pointerout', pointerOut, zone);
        // @ts-ignore
        zone.on('pointerdown', onClick, zone);

        // @ts-ignore
        dashLine.isVisible = function(): boolean{
            return Math.abs(this.alpha - showAlpha) < 1e-8;
        }


        // @ts-ignore
        container.show = function(){
            dashLine.alpha = showAlpha;
        }

        // @ts-ignore
        container.hide = function (){
            dashLine.alpha = hideAlpha;
        }


        container.addChild(dashLine);
        container.addChild(zone);
        return container
    }

    // private createMovingRange(mark: string): PIXI.Graphics{
    //     let color = 0xb1b1b1;
    //     let position: PIXI.IPointDat
    //     // lineStyle.colora = {x: 0, y: 0};
    //     if(mark == 'range1')
    //     {
    //         // position.x = 
    //     }
    //     else if(mark == 'range2')
    //     {

    //     }
    //     else if(mark == 'range3')
    //     {

    //     }
    //     lineStyle.width = 2;
    //     lineStyle.color = color;

    //     let range = PixiGraphics.get().drawDashRectangle(0, 0, 400, 400, lineStyle);
    //     range.pivot.set(0.5);
    //     // @ts-ignore
    //     range.mark = mark;
    //     range.position
    //     return range;
    // }

}