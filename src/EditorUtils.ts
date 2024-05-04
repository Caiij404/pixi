export namespace EditorUtils
{
    export function getColor(mark: string): number{
    let color = 0xb1b1b1;
    switch(mark)
    {
        case 'zone1':
        {
            color = 0xff5436;
            break;
        }
        case 'zone2':
        {
            color = 0xa999ff;
            break;
        }
        case 'zone3':
            {
                color = 0x0acca2;
                break;
            }
        }
        return color;
    }

    export function getColorString(mark: string): string{
        let color = '#b1b1b1'

        switch(mark)
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
        return color;
    }
}