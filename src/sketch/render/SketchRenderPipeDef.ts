module Fayde.Drawing.sketch.render {
    export interface IInput extends minerva.core.render.IInput {
        actualWidth: number;
        actualHeight: number;
        canvas: HTMLCanvasElement;
        sketcher: ISketcher;
    }
    export interface IState extends minerva.core.render.IState {
    }
    export interface IOutput extends minerva.core.render.IOutput {
    }
    export class SketchRenderPipeDef extends minerva.core.render.RenderPipeDef {
        constructor () {
            super();
            this.replaceTapin('doRender', tapins.doRender);
        }
    }

    module tapins {
        export function doRender (input: IInput, state: IState, output: IOutput, ctx: minerva.core.render.RenderContext, region: minerva.Rect, tree: minerva.core.UpdaterTree): boolean {
            ctx.save();
            //TODO: this.RenderLayoutClip(ctx);
            var w = input.actualWidth;
            var h = input.actualHeight;
            input.sketcher && input.sketcher(input.canvas, w, h);
            ctx.raw.drawImage(this.Canvas, 0, 0, w, h, 0, 0, w, h);
            ctx.restore();
            return true;
        }
    }
}