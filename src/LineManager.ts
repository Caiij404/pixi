import { EditorService } from "./EditorService";
import { Line } from "./Line";

export class LineManager{
    private static instance: LineManager;
    private line1: Line | undefined;
    private line2: Line | undefined;
    private line3: Line | undefined;

    private constructor(){

    }

    public static get():LineManager{
        if(!this.instance){
            this.instance = new LineManager();
        }
        return this.instance;
    }

    createLine():Line{
        return new Line();
    }

    confirmCreate(line: Line, zone: string){
        let data: any = {}
        let hasLine = false;
        let stage = EditorService.get().getStage();
        switch(zone)
        {
            case 'zone1':
            {
                if(this.line1)
                {
                    hasLine = true;
                    data.position = this.line1.position;
                    this.line1.destroy();
                }
                break;
            }
            case 'zone2':
            {
                if(this.line2)
                {
                    hasLine = true;
                    data.position = this.line2.position;
                    this.line2.destroy();
                }
                break;
            }
            case 'zone3':
            {
                if(this.line3)
                {
                    hasLine = true;
                    data.position = this.line3.position;
                    this.line3.destroy();
                }
                break;
            }
        }
        
        line.confirmCreate(zone, hasLine ? data : undefined);
        
    }

    cancelCreate(line: Line){
        line.destroy();
    }
}