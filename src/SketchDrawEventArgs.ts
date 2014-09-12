module Fayde.Drawing {
    export class SketchDrawEventArgs extends EventArgs {
        SketchSession: SketchSession;

        constructor (session: SketchSession) {
            super();
            Object.defineProperty(this, 'SketchSession', { value: session, writable: false });
        }
    }
}