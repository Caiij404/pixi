import * as PIXI from 'pixi.js'
export class PixiGraphics {
    private static instance: PixiGraphics;
    private constructor() {
        (<any>PIXI.Graphics.prototype).drawDashLine = function (toX: number, toY: number, dash = 8, gap = 4) {
            const lastPosition = this.currentPath.points;

            const currentPosition = {
                x: lastPosition[lastPosition.length - 2] || 0,
                y: lastPosition[lastPosition.length - 1] || 0
            };

            const absValues = {
                toX: Math.abs(toX),
                toY: Math.abs(toY)
            };

            for (
                ;
                Math.abs(currentPosition.x) < absValues.toX ||
                Math.abs(currentPosition.y) < absValues.toY;
            ) {
                currentPosition.x =
                    Math.abs(currentPosition.x + dash) < absValues.toX
                        ? currentPosition.x + dash
                        : toX;
                currentPosition.y =
                    Math.abs(currentPosition.y + dash) < absValues.toY
                        ? currentPosition.y + dash
                        : toY;

                this.lineTo(currentPosition.x, currentPosition.y);

                currentPosition.x =
                    Math.abs(currentPosition.x + gap) < absValues.toX
                        ? currentPosition.x + gap
                        : toX;
                currentPosition.y =
                    Math.abs(currentPosition.y + gap) < absValues.toY
                        ? currentPosition.y + gap
                        : toY;

                this.moveTo(currentPosition.x, currentPosition.y);
            }
        };
    };

    public static get(): PixiGraphics {
        if (!this.instance) {
            this.instance = new PixiGraphics();
        }
        return this.instance;
    }

    drawDashRectangle(x: number, y: number, width: number, height: number, lineStyle?: any): PIXI.Graphics {

        const rect = new PIXI.Graphics();

        rect.lineStyle(lineStyle ? lineStyle : {
            width: 2,
            color: 0xb1b1b1,
        });

        rect.moveTo(x,y);
        // @ts-ignore
        rect.drawDashLine(x + width, y);

        rect.moveTo(x + width, y);
        // @ts-ignore
        rect.drawDashLine(x + width, y + height);

        rect.moveTo(x, y);
        // @ts-ignore
        rect.drawDashLine(x, y + height);

        rect.moveTo(x, y + height);
        // @ts-ignore
        rect.drawDashLine(x + width, y + height);

        return rect;
    }

    drawDashLine(moveTo: [number, number], lineTo: [number, number], lineStyle?: PIXI.LineStyle): PIXI.Graphics {
        const line = new PIXI.Graphics();
        line.lineStyle(lineStyle ? lineStyle : {
            width: 2,
            color: 0xb1b1b1
        });
        line.moveTo(moveTo[0], moveTo[1]);
        // @ts-ignore
        line.drawDashLine(lineTo[0], lineTo[1]);

        return line;
    }
}