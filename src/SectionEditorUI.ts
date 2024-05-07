import * as PIXI from 'pixi.js';
import { StatusManager } from './StatusManager';
import { Creation } from './Creation';
import { EditorService } from './EditorService';
import { ZoneManager } from './ZoneManager';

export class SectionEditorUI {
    private static instance: SectionEditorUI;
    private app: PIXI.Application;
    private stage: PIXI.Container
    private baseGraphics: PIXI.Container;
    private heightText: PIXI.Text;
    private height: number = 200;

    public statusManager: StatusManager;
    private rootContainer: PIXI.Container;

    private constructor() {
        this.app = new PIXI.Application({
            antialias: true,
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xffffff,
            resolution: window.devicePixelRatio | 1,
            resizeTo: window,
        });
        document.body.appendChild(this.app.view as any);

        (this.app.view as HTMLCanvasElement).addEventListener!('wheel', (e: WheelEvent) => {
            let rect = this.app.view.getBoundingClientRect!();
            if (rect) {
                let { x, y } = rect;
                let globalPos = new PIXI.Point(e.clientX - x, e.clientY - y);
                let delta = e.deltaY;
                let oldZoom = this.getZoom();
                let newZoom = oldZoom * 0.999 ** delta;
                if (newZoom > 5) newZoom = 5;
                if (newZoom < 0.2) newZoom = 0.2;
                this.applyZoom(oldZoom, newZoom, globalPos);
            }
        })


        // @ts-ignore
        this.app.stage.name = 'app.stage'
        EditorService.get().initApp(this.app);

        this.rootContainer = new PIXI.Container();
        EditorService.get().setStage(this.rootContainer);
        this.app.stage.addChild(this.rootContainer);

        this.stage = this.rootContainer;
        this.stage.position.set(this.app.screen.width / 2, this.app.screen.height / 2);

        //@ts-ignore
        this.stage.eventMode = 'static';

        this.baseGraphics = this.createGraphics();
        this.stage.addChild(this.baseGraphics);

        this.heightText = this.createSweepHeight();
        this.stage.addChild(this.heightText);

        ZoneManager.get();

        this.statusManager = StatusManager.get();

        window.addEventListener('keydown', (e) => {
            if (e.key == '8') {
                Creation.get().start();
            }
        })
    }

    public static get(): SectionEditorUI {
        if (!this.instance) {
            this.instance = new SectionEditorUI();
        }
        return this.instance;
    }

    private createGraphics(): PIXI.Container {
        const baseGraphicsContain = new PIXI.Container();

        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xb1b1b1, 1);
        graphics.beginFill(0xdddddd);
        const path = [
            0, 0, 0, 300, 450, 300, 450, 320, -20, 320, -20, 20, -200, 20, -200, 0,
        ];
        graphics.drawPolygon(path);
        graphics.endFill();

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

    private createSweepHeight(): PIXI.Text {
        const textStyle = { fontSize: 15 };
        const text = new PIXI.Text(this.height.toString(), textStyle);
        text.rotation = Math.PI / 2;
        text.pivot.set(text.width / 2, text.height / 2);
        text.position.set(445, -150);
        return text;
    }

    public getHeight(): number {
        return this.height;
    }

    public setHeight(n: number) {
        this.height = n;
        this.heightText.text = n.toString();
    }

    public getZoom(): number {
        // stage是宽高等比例缩放的，所以取x或者取y是一样的
        return this.rootContainer.scale.x;
    }

    applyZoom(oldZoom: number, newZoom: number, pointerGlobalPos: PIXI.Point) {
        const oldStageMatrix = this.rootContainer.localTransform.clone();
        const oldStagePos = oldStageMatrix.applyInverse(pointerGlobalPos);
        const dx = oldStagePos.x * oldZoom - oldStagePos.x * newZoom;
        const dy = oldStagePos.y * oldZoom - oldStagePos.y * newZoom;

        this.rootContainer.setTransform(
            this.rootContainer.position.x + dx,
            this.rootContainer.position.y + dy,
            newZoom,
            newZoom,
            0,
            0,
            0,
            0,
            0
        );
        this.rootContainer.updateTransform()
    }

}