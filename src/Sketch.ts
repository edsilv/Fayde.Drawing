
module Fayde.Drawing {

    export class Sketch extends Fayde.Controls.Control {
        CreateLayoutUpdater (node: Controls.ControlNode) {
            return new SketchLayoutUpdater(node);
        }

        private MAX_FPS: number = 100;
        private  MAX_MSPF: number = 1000 / this.MAX_FPS;

        private _Timer: Fayde.ClockTimer;
        private _LastVisualTick: number = new Date(0).getTime();

        static IsAnimatedProperty = DependencyProperty.Register("IsAnimated", () => Boolean, Sketch, false, (d, args) => (<Sketch>d).OnIsAnimatedChanged(args));

        IsAnimated: boolean;

        Draw = new MulticastEvent<SketchDrawEventArgs>();

        constructor () {
            super();
            this.DefaultStyleKey = Sketch;

            this._Timer = new Fayde.ClockTimer();
            this._Timer.RegisterTimer(this);
        }

        OnTicked (lastTime: number, nowTime: number) {
            if (!this.IsAnimated) return;

            var now = new Date().getTime();
            if (now - this._LastVisualTick < this.MAX_MSPF)
                return;
            this._LastVisualTick = now;

            this.XamlNode.LayoutUpdater.InvalidateSubtreePaint();
        }

        private OnIsAnimatedChanged (args: IDependencyPropertyChangedEventArgs) {

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