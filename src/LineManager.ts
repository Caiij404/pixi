import * as PIXI from 'pixi.js';
import { Line } from "./Line";

// LineManager 不需要lines数组，因为剖面编辑也就3个区域，在画布中最多也就三个线条
// 那对应的zone也就只需要三个，其实可以另外写成一个manager，会方便些吧

export class LineManager{
    private static instance: LineManager;
    private stage: PIXI.Container<PIXI.DisplayObject> | undefined
    private lines: Line[] = [];
    private constructor(){
    }
    
    public static get(): LineManager
    {
        if(!this.instance)
        {
            this.instance = new LineManager();
        }
        return this.instance;
    }

    public initStage(stage: PIXI.Container<PIXI.DisplayObject>)
    {
        this.stage = stage;
    }

    createLine(): Line
    {
        let line = new Line();
        this.addLine(line);
        return line;
    }

    cancelCreate(line: Line)
    {
        this.deleteLine(line.id);
    }

    addLine(l: Line)
    {
        this.lines.push(l);
        if(this.stage)
        {
            this.stage.addChild(l.getSprite());
        }
    }

    deleteLine(id: string)
    {
        for(let i=0; i<this.lines.length; ++i)
        {
            if(this.lines[i].id === id && !this.lines[i].destroyed)
            {
                this.lines[i].destroy();
                this.lines.splice(i,1);
            }
        }
    }
}

