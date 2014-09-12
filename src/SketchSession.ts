module Fayde.Drawing {
    export class SketchSession {
        private _Canvas: HTMLCanvasElement;
        private _Ctx: CanvasRenderingContext2D;

        Width: number;
        Height: number;

        constructor (canvas: HTMLCanvasElement, width: number, height: number) {
            this._Canvas = canvas;
            this._Ctx = canvas.getContext('2d');
            Object.defineProperty(this, 'Width', {value: width, writable: false});
            Object.defineProperty(this, 'Height', { value: height, writable: false });

        }

        Clear (color?: Color) {
            if (color) {
                this._Ctx.fillStyle = Media.SolidColorBrush.FromColor(color).ToHtml5Object();
                this._Ctx.fillRect(0, 0, this.Width, this.Height);
            } else {
                this._Ctx.clearRect(0, 0, this.Width, this.Height);
            }
        }
    }
}