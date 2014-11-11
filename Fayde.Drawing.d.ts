declare module Fayde.Drawing {
    var Version: string;
}
declare module Fayde.Drawing {
    class Sketch extends FrameworkElement {
        public CreateLayoutUpdater(): sketch.SketchUpdater;
        static IsAnimatedProperty: DependencyProperty;
        public IsAnimated: boolean;
        private _Timer;
        private _LastVisualTick;
        public Milliseconds: number;
        public Draw: MulticastEvent<SketchDrawEventArgs>;
        public Click: RoutedEvent<RoutedEventArgs>;
        public MousePosition: Point;
        constructor();
        public RaiseDraw(canvas: HTMLCanvasElement, width: number, height: number): void;
        public OnTicked(lastTime: number, nowTime: number): void;
        private OnIsAnimatedChanged(args);
        public OnMouseEnter(e: Input.MouseEventArgs): void;
        public OnMouseLeave(e: Input.MouseEventArgs): void;
        public OnMouseMove(e: Input.MouseEventArgs): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs): void;
        public OnTouchDown(e: Input.TouchEventArgs): void;
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
        public Update(): void;
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
declare module Fayde.Drawing.sketch {
    interface ISketcher {
        (canvas: HTMLCanvasElement, width: number, height: number): any;
    }
}
declare module Fayde.Drawing.sketch {
    interface ISketchUpdaterAssets extends minerva.core.IUpdaterAssets, render.IInput {
    }
    class SketchUpdater extends minerva.core.Updater {
        public assets: ISketchUpdaterAssets;
        public init(): void;
        public onSizeChanged(oldSize: minerva.Size, newSize: minerva.Size): void;
    }
}
declare module Fayde.Drawing.sketch.hittest {
    class SketchHitTestPipeDef extends minerva.core.hittest.HitTestPipeDef {
        constructor();
    }
}
declare module Fayde.Drawing.sketch.render {
    interface IInput extends minerva.core.render.IInput {
        actualWidth: number;
        actualHeight: number;
        canvas: HTMLCanvasElement;
        sketcher: ISketcher;
    }
    interface IState extends minerva.core.render.IState {
    }
    interface IOutput extends minerva.core.render.IOutput {
    }
    class SketchRenderPipeDef extends minerva.core.render.RenderPipeDef {
        constructor();
    }
}
