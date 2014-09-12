var Fayde;
(function (Fayde) {
    (function (Drawing) {
        Drawing.Version = '0.1.0';
    })(Fayde.Drawing || (Fayde.Drawing = {}));
    var Drawing = Fayde.Drawing;
})(Fayde || (Fayde = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Drawing) {
        var Controls = Fayde.Controls;

        var Sketch = (function (_super) {
            __extends(Sketch, _super);
            function Sketch() {
                _super.call(this);
                this.Draw = new MulticastEvent();
                this.DefaultStyleKey = Sketch;
            }
            Sketch.prototype.CreateLayoutUpdater = function (node) {
                return new SketchLayoutUpdater(node);
            };
            return Sketch;
        })(Controls.Control);
        Drawing.Sketch = Sketch;

        var SketchLayoutUpdater = (function (_super) {
            __extends(SketchLayoutUpdater, _super);
            function SketchLayoutUpdater(node) {
                _super.call(this, node);
                this._Canvas = document.createElement('canvas');
                this.SetContainerMode(true);
            }
            SketchLayoutUpdater.prototype.Render = function (ctx, region) {
                ctx.save();
                this.RenderLayoutClip(ctx);
                this.RaiseDraw();
                var w = this.ActualWidth;
                var h = this.ActualHeight;
                ctx.drawImage(this._Canvas, 0, 0, w, h, 0, 0, w, h);
                ctx.restore();
            };

            SketchLayoutUpdater.prototype.RaiseDraw = function () {
                var sketch = this.Node.XObject;
                var session = new Drawing.SketchSession(this._Canvas, this.ActualWidth, this.ActualHeight);
                sketch.Draw.Raise(this, new Drawing.SketchDrawEventArgs(session));
            };
            return SketchLayoutUpdater;
        })(Fayde.LayoutUpdater);
        Drawing.SketchLayoutUpdater = SketchLayoutUpdater;
    })(Fayde.Drawing || (Fayde.Drawing = {}));
    var Drawing = Fayde.Drawing;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Drawing) {
        var SketchDrawEventArgs = (function (_super) {
            __extends(SketchDrawEventArgs, _super);
            function SketchDrawEventArgs(session) {
                _super.call(this);
                Object.defineProperty(this, 'SketchSession', { value: session, writable: false });
            }
            return SketchDrawEventArgs;
        })(EventArgs);
        Drawing.SketchDrawEventArgs = SketchDrawEventArgs;
    })(Fayde.Drawing || (Fayde.Drawing = {}));
    var Drawing = Fayde.Drawing;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Drawing) {
        var SketchSession = (function () {
            function SketchSession(canvas, width, height) {
                this._Canvas = canvas;
                this._Canvas.width = width;
                this._Canvas.height = height;
                this._Ctx = canvas.getContext('2d');
                Object.defineProperty(this, 'Width', { value: width, writable: false });
                Object.defineProperty(this, 'Height', { value: height, writable: false });
            }
            SketchSession.prototype.Clear = function (color) {
                if (color) {
                    this._Ctx.fillStyle = Fayde.Media.SolidColorBrush.FromColor(color).ToHtml5Object();
                    this._Ctx.fillRect(0, 0, this.Width, this.Height);
                } else {
                    this._Ctx.clearRect(0, 0, this.Width, this.Height);
                }
            };

            SketchSession.prototype.FillRect = function (x, y, width, height) {
                this._Ctx.fillStyle = "#bada55";
                this._Ctx.fillRect(x, y, width, height);
            };
            return SketchSession;
        })();
        Drawing.SketchSession = SketchSession;
    })(Fayde.Drawing || (Fayde.Drawing = {}));
    var Drawing = Fayde.Drawing;
})(Fayde || (Fayde = {}));
//# sourceMappingURL=Fayde.Drawing.js.map
