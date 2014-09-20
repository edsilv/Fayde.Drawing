declare module Fayde.Drawing {
    var Version: string;
}
declare module Fayde.Drawing {
    class Sketch extends Controls.Control {
        public CreateLayoutUpdater(node: Controls.ControlNode): SketchLayoutUpdater;
        private _Timer;
        private _LastVisualTick;
        static IsAnimatedProperty: DependencyProperty;
        public IsAnimated: boolean;
        public Milliseconds: number;
        public Draw: MulticastEvent<SketchDrawEventArgs>;
        constructor();
        public OnTicked(lastTime: number, nowTime: number): void;
        private OnIsAnimatedChanged(args);
        private Sketch_SizeChanged(sender, e);
    }
    class SketchLayoutUpdater extends LayoutUpdater {
        public Canvas: HTMLCanvasElement;
        constructor(node: Controls.ControlNode);
        public Render(ctx: RenderContextEx, region: rect): void;
        private RaiseDraw();
    }
}
declare module Fayde.Drawing {
    class SketchDrawEventArgs extends EventArgs {
        public SketchSession: SketchSession;
        constructor(session: SketchSession);
    }
}
declare module Fayde.Drawing {
    class SketchSession {
        private _Canvas;
        public Ctx: CanvasRenderingContext2D;
        public Width: number;
        public Height: number;
        public Milliseconds: number;
        constructor(canvas: HTMLCanvasElement, width: number, height: number, milliseconds: number);
    }
}
