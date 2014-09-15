module Fayde.Drawing {
    export class SketchSession {
        private _Canvas: HTMLCanvasElement;
        public Ctx: CanvasRenderingContext2D;
        public Registered: boolean = false;

        Width: number;
        Height: number;

        constructor (canvas: HTMLCanvasElement, width: number, height: number) {
            this._Canvas = canvas;
            this._Canvas.width = width;
            this._Canvas.height = height;
            this.Ctx = canvas.getContext('2d');
            Object.defineProperty(this, 'Width', {value: width, writable: false});
            Object.defineProperty(this, 'Height', { value: height, writable: false });
        }

//        Clear (color?: Color) {
//            if (color) {
//                this.Ctx.fillStyle = Media.SolidColorBrush.FromColor(color).ToHtml5Object();
//                this.Ctx.fillRect(0, 0, this.Width, this.Height);
//            } else {
//                this.Ctx.clearRect(0, 0, this.Width, this.Height);
//            }
//        }
//
//        FillRect(x: number, y: number, width: number, height: number){
//            this.Ctx.fillStyle = "#bada55";
//            this.Ctx.fillRect(x, y, width, height);
//        }
    }
}