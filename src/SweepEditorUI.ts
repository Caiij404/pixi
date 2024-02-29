import * as PIXI from 'pixi.js';
import { LineManager } from './LineManager';

export class SweepEditorUI{
    private static instance: SweepEditorUI;
    private app: PIXI.Application;
    private stage: PIXI.Container
    private baseGraphics: PIXI.Container;
    private heightText: PIXI.Text;
    private height: number = 200;
    private hitArea: PIXI.Container<PIXI.Graphics>;

    public lineManager: LineManager;

    private constructor(){
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xffffff,
            resolution: window.devicePixelRatio | 1,
            resizeTo: window,
        });
        document.body.appendChild(this.app.view as any);

        this.stage = this.app.stage;
        this.stage.position.set(window.innerWidth / 2, window.innerHeight / 2);

        this.baseGraphics = this.createGraphics();
        this.stage.addChild(this.baseGraphics);

        this.heightText = this.createSweepHeight();
        this.stage.addChild(this.heightText);

        this.hitArea = this.createHitArea();
        this.stage.addChild(this.hitArea);

        this.lineManager = LineManager.get();
        this.lineManager.initStage(this.stage);

    }

    public static get(): SweepEditorUI{
        if(!this.instance)
        {
            this.instance = new SweepEditorUI();
        }
        return this.instance;
    }

    private createGraphics(): PIXI.Container{
        const baseGraphicsContain = new PIXI.Container();
        
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xb1b1b1, 1);
        graphics.beginFill(0xdddddd);
        const path = [
            0, 0, 0, 300, 450, 300, 450, 320, -20, 320, -20, 20, -200, 20, -200, 0,
        ];
        graphics.drawPolygon(path);
        graphics.endFill();
    
        // graphics.position.set(500, 500);
        graphics.scale.y = -1;
        baseGraphicsContain.addChild(graphics);
    
        const line1 = new PIXI.Graphics();
        line1.lineStyle(2, 0xb1b1b1, 1);
        line1.moveTo(0, 0);
        line1.lineTo(20, 0);
        line1.position.set(410, -298);
        baseGraphicsContain.addChild(line1);
    
        const line2 = line1.clone();
        line2.position.set(410, 0);
        baseGraphicsContain.addChild(line2);
    
        const line3 = new PIXI.Graphics();
        line3.lineStyle(2, 0xb1b1b1, 1);
        line3.moveTo(0, 0);
        line3.lineTo(0, -300);
        line3.position.set(420, 0);
        baseGraphicsContain.addChild(line3);

        return baseGraphicsContain;
    }

    private createSweepHeight(): PIXI.Text{
        const textStyle = {fontSize: 15};
        const text = new PIXI.Text(this.height.toString(), textStyle);
        text.rotation = Math.PI / 2;
        // text.scale.y = -1;
        // text.scale.x = -1;
        text.pivot.set(text.width / 2, text.height / 2);
        text.position.set(445,-150);
        return text;
    }

    public getHeight(): number{
        return this.height;
    }

    public setHeight(n: number){
        this.height = n;
        this.heightText.text = n.toString();
    }

    private createHitArea(): PIXI.Container<PIXI.Graphics>{
        let areas = new PIXI.Container<PIXI.Graphics>();

        const rect1 = new PIXI.Graphics();
        //@ts-ignore
        rect1.mark = 'zone2';
        rect1.lineStyle({
            width: 2,
            color: 0xb1b1b1,
            alpha: 0.8,
            alignment: 0.5,
        });
        rect1.pivot.set(0,50)
        rect1.beginFill(0xffffff);
        rect1.drawRect(0,0,80,50);
        rect1.endFill();
        areas.addChild(rect1);
    
        const rect2 = rect1.clone();
        rect2.pivot.set(80,0);
        //@ts-ignore
        rect2.mark = 'zone1';
        areas.addChild(rect2);
    
        const rect3 = new PIXI.Graphics();
        rect3.lineStyle(2, 0xb1b1b1, 1);
        rect3.pivot.set(0,300);
        rect3.beginFill(0xffffff);
        rect3.drawRect(0,0,80,80);
        rect3.endFill();
        //@ts-ignore
        rect3.mark = 'zone3';
        areas.addChild(rect3);

        return areas;
    }

}