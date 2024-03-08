import * as PIXI from 'pixi.js'
import { PixiGraphics } from './PixiGraphics';
import { StatusManager } from './StatusManager';

const showAlpha = 1;
const hideAlpha = 0;

const lineStyle_Width = 1;
const textString = '添加角线区域';

type info = {size: [number,number], pivot: [number, number], color: number}

export type moveRange = {minx:number ,maxx: number, miny: number, maxy: number}

export class Zone{
    private invisibleZone: PIXI.Graphics;
    private dashZone: PIXI.Graphics;
    private range: PIXI.Graphics;
    private zone: PIXI.Container;
    public mark: string;
    private text: PIXI.Text;

    private statusManager: StatusManager;

    constructor(mark: string){
        this.mark = mark;
        this.statusManager = StatusManager.get();
        this.invisibleZone = this.createInvisibleZone();
        this.dashZone = this.createDashZone();
        this.range = this.createRange();

        this.text = this.createText();

        this.zone = new PIXI.Container();
        this.zone.addChild(this.text);
        this.zone.addChild(this.invisibleZone);
        this.zone.addChild(this.dashZone);
        this.zone.addChild(this.range);
        this.hideRange();
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
            width: lineStyle_Width,
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
            width: lineStyle_Width,
            color: color,
            alpha: showAlpha,
        }
        let range = PixiGraphics.get().drawDashRectangle(0, 0, size[0], size[1], style);
        range.pivot.set(pivot[0], pivot[1]);

        return range;
    }

    createText(): PIXI.Text{

        let color = '#b1b1b1'

        switch(this.mark)
        {
            case 'zone1':
                {
                    color = '#ff5436'
                    break;
                }
            case 'zone2':
                {
                    color = '#a999ff'
                    break;
                }
            case 'zone3':
                {
                    color = '#0acca2';
                    break;
                }
        }
        const style = {
            fontSize: 13,
            fill: color
        }
        const text = new PIXI.Text(textString, style);
        let info = this.getZoneInfo();
        let size = info.size;
        let pivot = info.pivot;
        text.pivot.set(pivot[0], pivot[1] - (size[1] / 2) + 13 / 2);
        text.resolution = 3;
        return text
    }

    getZone():PIXI.Container{
        return this.zone;
    }


    showDashZone(){
        this.dashZone.alpha = showAlpha;
        this.text.alpha = showAlpha;
    }

    hideDashZone(){
        this.dashZone.alpha = hideAlpha;
        this.text.alpha = hideAlpha;
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
            c = color1;
        }
        else if (this.mark == 'zone2') {
            p = [0, 50];
            s = [80, 50];
            c = color2;
        }
        else if (this.mark == 'zone3') {
            p = [0, 300];
            s = [80, 80];
            c = color3;
        }
        return {size: [s[0],s[1]], pivot: [p[0], p[1]], color: c};
    }

    getRangeInfo():info{
        let s = [400, 400];
        let p = [0, 0];
        let c = 0xb1b1b1;
        if (this.mark == 'zone1') {
            c = color1;
            p = [200 + 80, 200];
        }
        else if (this.mark == 'zone2') {
            c = color2;
            p = [200, 200];
        }
        else if (this.mark == 'zone3') {
            c = color3;
            p = [200, 200 + 300];
        }
        return {size: [s[0],s[1]], pivot: [p[0], p[1]], color: c};
    }

    getMoveRange():moveRange{
        let info = this.getRangeInfo();
        let size = info.size;
        let pivot = info.pivot;

        let leftTop = {x: -pivot[0], y: -pivot[1]}
        let rightBottom = {x: size[0] - pivot[0], y: size[1] - pivot[1]}
        return {minx: leftTop.x, miny: leftTop.y, maxx: rightBottom.x, maxy: rightBottom.y};
    }
}

const color1 = 0xff5436;
const color2 = 0xa999ff;
const color3 = 0x0acca2;