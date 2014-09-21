declare module Fayde.Drawing {
    var Version: string;
}
declare module Fayde.Drawing {
    class Sketch extends Controls.Control {
        public CreateLayoutUpdater(node: Controls.ControlNode): SketchLayoutUpdater;
        static IsAnimatedProperty: DependencyProperty;
        private _Timer;
        private _LastVisualTick;
        public IsAnimated: boolean;
        public Milliseconds: number;
        public Draw: MulticastEvent<SketchDrawEventArgs>;
        public Click: RoutedEvent<RoutedEventArgs>;
        public MousePosition: Point;
        constructor();
        public OnTicked(lastTime: number, nowTime: number): void;
        private OnIsAnimatedChanged(args);
        private Sketch_SizeChanged(sender, e);
        public OnMouseEnter(e: Input.MouseEventArgs): void;
        public OnMouseLeave(e: Input.MouseEventArgs): void;
        public OnMouseMove(e: Input.MouseEventArgs): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs): void;
        public OnTouchDown(e: Input.TouchEventArgs): void;
    }
    class SketchLayoutUpdater extends LayoutUpdater {
        public Canvas: HTMLCanvasElement;
        constructor(node: Controls.ControlNode);
        public Render(ctx: RenderContextEx, region: rect): void;
        private RaiseDraw();
    }
}
declare module Fayde.Drawing {
    class SketchContext {
        private _IsSetup;
        private _SketchSession;
        public FrameCount: number;
        public SketchSession : SketchSession;
        public Ctx : CanvasRenderingContext2D;
        public Width : number;
        public Height : number;
        public Milliseconds : number;
        constructor();
        public Setup(): void;
        public Draw(): void;
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
