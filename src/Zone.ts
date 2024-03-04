import * as PIXI from 'pixi.js'
import { PixiGraphics } from './PixiGraphics';
import { StatusManager } from './StatusManager';

const showAlpha = 1;
const hideAlpha = 0;

type info = {size: [number,number], pivot: [number, number], color: number}

export class Zone{
    private invisibleZone: PIXI.Graphics;
    private dashZone: PIXI.Graphics;
    private range: PIXI.Graphics;
    private zone: PIXI.Container;
    public mark: string;

    private statusManager: StatusManager;

    constructor(mark: string){
        this.mark = mark;
        this.statusManager = StatusManager.get();
        this.invisibleZone = this.createInvisibleZone();
        this.dashZone = this.createDashZone();
        this.range = this.createRange();

        this.zone = new PIXI.Container();
        this.zone.addChild(this.invisibleZone)
        this.zone.addChild(this.dashZone)
        this.zone.addChild(this.range)
    }

    createInvisibleZone(): PIXI.Graphics{
        let info = this.getZoneInfo();
        let size = info.size;
        let pivot = info.pivot;
        let color = info.color;

        let zone = new PIXI.Graphics();
        zone.lineStyle(2, color, 0);
        zone.beginFill(0x000000);
        zone.drawRect(0,0,size[0],size[1]);
        zone.endFill();
        zone.alpha = 0;
        zone.pivot.set(pivot[0], pivot[1]);

        // @ts-ignore
        zone.eventMode = 'static';
        const pointerOver = () => {
            // @ts-ignore
            if(this.dashZone.isVisible())
            {
                this.statusManager.setHoverZone(this.mark);
                console.log(this.mark, 'over');
            }
        }
        const pointerOut = () => {
            // @ts-ignore
            if(this.dashZone.isVisible())
            {
                this.statusManager.setHoverZone();
                console.log(this.mark, 'out');
            }
        }
        const onClick = () => {
            //@ts-ignore
            if(this.dashZone.isVisible())
            {
                console.log(this.mark, 'onClick');
            }
        }

        // @ts-ignore
        zone.on('pointerover', pointerOver, zone);
        // @ts-ignore
        zone.on('pointerout', pointerOut, zone);
        // @ts-ignore
        zone.on('pointerdown', onClick, zone);

        return zone;
    }

    createDashZone(): PIXI.Graphics{
        let info = this.getZoneInfo();
        let size = info.size;
        let pivot = info.pivot;
        let color = info.color;
        let style: any = {
            width: 2,
            color: color,
            alpha: showAlpha,
        }
        let dashZone = PixiGraphics.get().drawDashRectangle(0, 0, size[0], size[1], style);
        dashZone.pivot.set(pivot[0], pivot[1]);

        // @ts-ignore
        dashZone.isVisible = function(): boolean{
            return Math.abs(this.alpha - showAlpha) < 1e-8;
        }
        
        return dashZone;
    }

    createRange(): PIXI.Graphics{
        let info = this.getRangeInfo();
        let size = info.size;
        let pivot = info.pivot;
        let color = info.color;
        let style: any = {
            width: 2,
            color: color,
            alpha: showAlpha,
        }
        let range = PixiGraphics.get().drawDashRectangle(0, 0, size[0], size[1], style);
        range.pivot.set(pivot[0], pivot[1]);

        return range;
    }

    getZone():PIXI.Container{
        return this.zone;
    }


    showDashZone(){
        this.dashZone.alpha = showAlpha;
    }

    hideDashZone(){
        this.dashZone.alpha = hideAlpha;
    }

    showRange(){
        this.range.alpha = showAlpha;
    }

    hideRange(){
        this.range.alpha = hideAlpha;
    }

    getZoneInfo():info{
        let s = [0, 0];
        let p = [0, 0];
        let c = 0xb1b1b1;
        if (this.mark == 'zone1') {
            p = [80, 0];
            s = [80, 50];
        }
        else if (this.mark == 'zone2') {
            p = [0, 50];
            s = [80, 50];
        }
        else if (this.mark == 'zone3') {
            p = [0, 300];
            s = [80, 80];
        }
        return {size: [s[0],s[1]], pivot: [p[0], p[1]], color: c};
    }

    getRangeInfo():info{
        let s = [400, 400];
        let p = [0, 0];
        let c = 0xb1b1b1;
        if (this.mark == 'zone1') {
            p = [200 + 80, 200];
        }
        else if (this.mark == 'zone2') {
            p = [200, 200];
        }
        else if (this.mark == 'zone3') {
            p = [200, 200 + 300];
        }
        return {size: [s[0],s[1]], pivot: [p[0], p[1]], color: c};
    }
}