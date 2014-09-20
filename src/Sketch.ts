
module Fayde.Drawing {

    import Control = Fayde.Controls.Control;

    var MAX_FPS: number = 100;
    var  MAX_MSPF: number = 1000 / MAX_FPS;

    export class Sketch extends Control {
        CreateLayoutUpdater (node: Controls.ControlNode) {
            return new SketchLayoutUpdater(node);
        }

        static IsAnimatedProperty = DependencyProperty.Register("IsAnimated", () => Boolean, Sketch, false, (d, args) => (<Sketch>d).OnIsAnimatedChanged(args));

        private _Timer: Fayde.ClockTimer;
        private _LastVisualTick: number = new Date(0).getTime();
        IsAnimated: boolean;
        Milliseconds: number;
        Draw = new MulticastEvent<SketchDrawEventArgs>();
        Click = new RoutedEvent<RoutedEventArgs>();
        _MousePosition: Point = new Point();

        constructor () {
            super();
            this.DefaultStyleKey = Sketch;

            // enable hit testing
            var lu = this.XamlNode.LayoutUpdater;
            lu.CanHitElement = true;
            lu.IsNeverInsideObject = false;

            this.SizeChanged.Subscribe(this.Sketch_SizeChanged, this);

            this._Timer = new Fayde.ClockTimer();
            this._Timer.RegisterTimer(this);
        }

        OnTicked (lastTime: number, nowTime: number) {
            if (!this.IsAnimated) return;

            var now = new Date().getTime();
            if (now - this._LastVisualTick < MAX_MSPF)
                return;
            this._LastVisualTick = now;

            this.Milliseconds = nowTime;

            this.XamlNode.LayoutUpdater.InvalidateSubtreePaint();
        }

        private OnIsAnimatedChanged (args: IDependencyPropertyChangedEventArgs) {

        }

        // on size changed, set canvas dimensions to fit.
        private Sketch_SizeChanged (sender: any, e: Fayde.SizeChangedEventArgs) {
            (<SketchLayoutUpdater>this.XamlNode.LayoutUpdater).Canvas.width = e.NewSize.Width;
            (<SketchLayoutUpdater>this.XamlNode.LayoutUpdater).Canvas.height = e.NewSize.Height;
        }

        OnMouseEnter(e: Input.MouseEventArgs) {
            super.OnMouseEnter(e);
        }

        OnMouseLeave(e: Input.MouseEventArgs) {
            super.OnMouseLeave(e);
        }

        OnMouseMove(e: Input.MouseEventArgs) {
            super.OnMouseMove(e);

            this._MousePosition = e.GetPosition(this);

            //this.OnMouseMove();
        }

        OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs) {
            super.OnMouseLeftButtonDown(e);

            e.Handled = true; // stop it bubbling up further

            this.OnClick();
        }

        OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs) {
            super.OnMouseLeftButtonDown(e);
        }

        OnTouchDown(e: Input.TouchEventArgs){
            super.OnTouchDown(e);

            e.Handled = true;

            this.OnClick();
        }

        OnClick() {
            this.Click.Raise(this, new RoutedEventArgs());
        }

//        OnMouseMove() {
//            this.MouseMove.Raise(this, new RoutedEventArgs());
//        }
    }

    export class SketchLayoutUpdater extends LayoutUpdater {
        public Canvas = document.createElement('canvas');

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
            ctx.drawImage(this.Canvas, 0, 0, w, h, 0, 0, w, h);
            ctx.restore();
        }

        private RaiseDraw () {
            var sketch = <Sketch>this.Node.XObject;
            var session = new SketchSession(this.Canvas, this.ActualWidth, this.ActualHeight, sketch.Milliseconds);
            sketch.Draw.Raise(this, new SketchDrawEventArgs(session));
        }
    }

}