/// <reference path="Fayde.d.ts" />

module Fayde.Drawing {
    import Controls = Fayde.Controls;

    export class Sketch extends Controls.Control {
        CreateLayoutUpdater (node: Controls.ControlNode) {
            return new SketchLayoutUpdater(node);
        }

        Draw = new MulticastEvent<SketchDrawEventArgs>();

        constructor () {
            super();
            this.DefaultStyleKey = Sketch;
        }
    }

    export class SketchLayoutUpdater extends LayoutUpdater {
        private _Canvas = document.createElement('canvas');

        constructor (node: Controls.ControlNode) {
            super(node);
            this.SetContainerMode(true);
        }

        Render (ctx: RenderContextEx, region: rect) {
            ctx.save();
            this.RenderLayoutClip(ctx);
            this.RaiseDraw();
            var w = this.ActualWidth;
            var h = this.ActualHeight;
            ctx.drawImage(this._Canvas, 0, 0, w, h, 0, 0, w, h);
            ctx.restore();
        }

        private RaiseDraw () {
            var sketch = <Sketch>this.Node.XObject;
            var session = new SketchSession(this._Canvas, this.ActualWidth, this.ActualHeight);
            sketch.Draw.Raise(this, new SketchDrawEventArgs(session));
        }
    }

}