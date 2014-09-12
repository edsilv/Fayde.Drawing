/// <reference path="src/Fayde.d.ts" />
declare module Fayde.Drawing {
    var Version: string;
}
declare module Fayde.Drawing {
    class Sketch extends Fayde.Controls.Control {
        public CreateLayoutUpdater(node: Fayde.Controls.ControlNode): SketchLayoutUpdater;
        public Draw: MulticastEvent<SketchDrawEventArgs>;
        constructor();
        public OnApplyTemplate(): void;
    }
    class SketchLayoutUpdater extends LayoutUpdater {
        private _Canvas;
        constructor(node: Fayde.Controls.ControlNode);
        public Render(ctx: RenderContextEx, region: rect): void;
    }
}
declare module Fayde.Drawing {
    class SketchDrawEventArgs extends EventArgs {
        private canvas;
        private ctx;
        constructor(canvas: HTMLCanvasElement);
    }
}
