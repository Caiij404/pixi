import { Line } from "./Line";
import { StatusManager } from './StatusManager';
import { EditorService } from './EditorService';

export class Creation{
    private static instance: Creation;
    private _creating = false;
    private _mouseMoveListenerEvent: (e: MouseEvent) => void;
    private _mouseDownListenerEvent: (e: MouseEvent) => void;
    private _mouseUpListenerEvent: (e: MouseEvent) => void;
    private _keyDownListenerEvent: (e: KeyboardEvent) => void;
    private line: Line | undefined;
    private lineArray: Line[] = [];

    private constructor(){
        this._mouseMoveListenerEvent = (e: MouseEvent) => {
            if(!this._creating)
                return ;
            let mousePoint = [e.clientX, e.clientY];
            // let original = [window.innerWidth / 2, window.innerHeight / 2];
            let stage = EditorService.get().getStage();
            let original = [stage.x, stage.y]
            let move = [mousePoint[0] - original[0], mousePoint[1] - original[1]];
            if(this.line && !this.line.destroyed)
            {
                this.line.translate(move[0], move[1]);
            }

        }

        this._mouseDownListenerEvent = (e: MouseEvent) => {
            
        }

        this._mouseUpListenerEvent = (e: MouseEvent) => {
            let button = e.button;
            if(button == 0)
            {
                let zone = StatusManager.get().getHoverZone();
                if(zone == 'zone1' || zone == 'zone2' || zone == 'zone3')
                {
                    this.confirm(zone);
                }
                else 
                {
                    this.end();
                }
            }
            else if(button == 2)
            {
                this.end();
            }
        }

        this._keyDownListenerEvent = (e: KeyboardEvent) => {
            if(!this._creating)
                return;

            if(e.key == 'Escape')
            {
                this.end();
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
        if(this._creating) return ;
        this._creating = true;
        this.line = new Line();
        // this.line = LineManager.get().createLine();
        this.addListenEvent();
    }

    end(){
        if(this._creating && this.line)
        {
            this.line.destroy();
            // LineManager.get().cancelCreate(this.line);
            this.line = undefined;
        }
        this._creating = false;
        this.removeListenEvent();
    }

    confirm(zone: string){
        if(!this._creating || !this.line)
            return ;
        let arr = this.lineArray
        let k=-1;
        for(let i=0; i<arr.length; ++i)
        {
            if(arr[i].mark == zone)
            {
                k = i;
                break;
            }
        }
        if(k != -1)
        {
            let line = arr[k];
            let data: any = {};
            data.position = line.position;
            arr.splice(k,1);
            line.destroy();

            this.line.confirmCreate(zone,data);
        }
        else 
        {
            this.line.confirmCreate(zone);
        }

        this.lineArray.push(this.line)
        this._creating = false;
        this.removeListenEvent();
    }
}