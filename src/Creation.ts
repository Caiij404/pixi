import * as PIXI from 'pixi.js'
import { Line } from "./Line";
import { LineManager } from "./LineManager";

export class Creation{
    private static instance: Creation;
    private _creating = false;
    private _mouseMoveListenerEvent: (e: MouseEvent) => void;
    private _mouseDownListenerEvent: (e: MouseEvent) => void;
    private _mouseUpListenerEvent: (e: MouseEvent) => void;
    private _keyDownListenerEvent: (e: KeyboardEvent) => void;
    private line: Line | undefined;
    private lastPoint: PIXI.IPointData = {x:0, y:0};

    private constructor(){
        this._mouseMoveListenerEvent = (e: MouseEvent) => {
            if(!this._creating)
                return ;

        }

        this._mouseDownListenerEvent = (e: MouseEvent) => {
            if(!this._creating)
                return ;
        }

        this._mouseUpListenerEvent = (e: MouseEvent) => {
            this.removeListenEvent();
        }

        this._keyDownListenerEvent = (e: KeyboardEvent) => {
            if(!this._creating)
                return;

            if(e.key == 'Escape')
            {
                if(this.line)
                {
                    LineManager.get().cancelCreate(this.line);
                    this.line = undefined;
                }
            }
        }
    }

    public static get(): Creation{
        if(!this.instance)
        {
            this.instance = new Creation();
        }
        return this.instance;
    }

    addListenEvent() {
        document.addEventListener('mousedown',this._mouseDownListenerEvent);
        document.addEventListener('mouseup',this._mouseUpListenerEvent);
        document.addEventListener('mousemove',this._mouseMoveListenerEvent);
        document.addEventListener('keydown',this._keyDownListenerEvent);
    }

    removeListenEvent() {
        document.removeEventListener('mousedown',this._mouseDownListenerEvent);
        document.removeEventListener('mouseup',this._mouseUpListenerEvent);
        document.removeEventListener('mousemove',this._mouseMoveListenerEvent);
        document.removeEventListener('keydown',this._keyDownListenerEvent);
    }

    start(){
        this.line = LineManager.get().createLine();
        this.addListenEvent();
    }

    end(){

        this.removeListenEvent();
    }

    confirm(){

        this.removeListenEvent();
    }
}