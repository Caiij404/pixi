import { EditorService } from "./EditorService";
import { Zone, moveRange } from "./Zone";

export class ZoneManager{
    private zone1: Zone;
    private zone2: Zone;
    private zone3: Zone;

    private static instance: ZoneManager;
    private constructor(){
        this.zone1 = new Zone('zone1')
        this.zone2 = new Zone('zone2')
        this.zone3 = new Zone('zone3')

        let stage = EditorService.get().getStage();
        stage.addChild(this.zone1.getZone())
        stage.addChild(this.zone2.getZone())
        stage.addChild(this.zone3.getZone())
    }

    public static get():ZoneManager{
        if(!this.instance)
        {
            this.instance = new ZoneManager();
        }
        return this.instance;
    }

    showRange(mark: string)
    {
        switch(mark)
        {
            case 'zone1':
                {
                    this.zone1.showRange();
                    break;
                }
            case 'zone2':
                {
                    this.zone2.showRange();
                    break;
                }
            case 'zone3':
                {
                    this.zone3.showRange();
                }
        }
    }

    hideRange(){
        this.zone1.hideRange()
        this.zone2.hideRange()
        this.zone3.hideRange()
    }

    getMoveRange(mark: string): moveRange{
        switch(mark)
        {
            case 'zone1':
                {
                    return this.zone1.getMoveRange();
                }
            case 'zone2':
                {
                    return this.zone2.getMoveRange();
                }
            default:
                {
                    return this.zone3.getMoveRange();
                }
        }
    }
    
}