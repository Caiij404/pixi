import * as PIXI from 'pixi.js'
export class EditorService
{
    private static instance: EditorService;
    private constructor(){}

    private app: PIXI.Application = new PIXI.Application;
    private stage: PIXI.Container = new PIXI.Container;

    public static get(): EditorService{
        if(!this.instance)
        {
            this.instance = new EditorService();
        }
        return this.instance;
    }

    public getApp(): PIXI.Application{
        return this.app;
    }

    public getStage(): PIXI.Container{
        return this.stage;
    }

    public initApp(a: PIXI.Application){
        this.app = a;
        this.stage = a.stage;
    }
}