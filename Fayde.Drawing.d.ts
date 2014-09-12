/// <reference path="src/Fayde.d.ts" />
declare module Fayde.Drawing {
    var Version: string;
}
declare module Fayde.Drawing {
    class Sketch extends Fayde.Controls.Control {
        public CreateLayoutUpdater(node: Fayde.Controls.ControlNode): SketchLayoutUpdater;
        public Draw: MulticastEvent<SketchDrawEventArgs>;
        constructor();
    }
    class SketchLayoutUpdater extends LayoutUpdater {
        private _Canvas;
        constructor(node: Fayde.Controls.ControlNode);
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
        private _Ctx;
        public Width: number;
        public Height: number;
        constructor(canvas: HTMLCanvasElement, width: number, height: number);
        public Clear(color?: Color): void;
    }
}
