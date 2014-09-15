/// <reference path="Fayde.d.ts" />

module Fayde.Drawing {

    import Controls = Fayde.Controls;

    var MAX_FPS = 100;
    var MAX_MSPF = 1000 / MAX_FPS;

    export class Sketch extends Controls.Control {
        CreateLayoutUpdater (node: Controls.ControlNode) {
            return new SketchLayoutUpdater(node);
        }

        private _Timer: Fayde.ClockTimer;

        static IsAnimatedProperty = DependencyProperty.Register("IsAnimated", () => Boolean, Sketch, false, (d, args) => (<Sketch>d).OnIsAnimatedChanged(args));

        IsAnimated: boolean;

        Draw = new MulticastEvent<SketchDrawEventArgs>();

        constructor () {
            super();
            this.DefaultStyleKey = Sketch;

            this._Timer = new Fayde.ClockTimer();
            this._Timer.RegisterTimer(this);
        }

        private _LastVisualTick: number = new Date(0).getTime();

        OnTicked (lastTime: number, nowTime: number) {
            if (!this.IsAnimated) return;

            var now = new Date().getTime();
            if (now - this._LastVisualTick < MAX_MSPF)
                return;
            this._LastVisualTick = now;

            this.XamlNode.LayoutUpdater.InvalidateSubtreePaint();
        }

        private OnIsAnimatedChanged (args: IDependencyPropertyChangedEventArgs) {
            this.IsAnimated = args.NewValue;
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