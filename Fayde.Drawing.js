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
                this.DefaultStyleKey = this.constructor;
            }
            Sketch.prototype.CreateLayoutUpdater = function (node) {
                return new SketchLayoutUpdater(node);
            };

            Sketch.prototype.OnApplyTemplate = function () {
                _super.prototype.OnApplyTemplate.call(this);
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
                var sketch = this.Node.XObject;
                sketch.Draw.Raise(this, new Drawing.SketchDrawEventArgs(this._Canvas));
                ctx.drawImage(this._Canvas, 0, 0);
                ctx.restore();
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
            function SketchDrawEventArgs(canvas) {
                _super.call(this);
                Object.defineProperty(this, 'canvas', { value: canvas, writable: false });
                Object.defineProperty(this, 'ctx', { value: canvas.getContext('2d'), writable: false });
            }
            return SketchDrawEventArgs;
        })(EventArgs);
        Drawing.SketchDrawEventArgs = SketchDrawEventArgs;
    })(Fayde.Drawing || (Fayde.Drawing = {}));
    var Drawing = Fayde.Drawing;
})(Fayde || (Fayde = {}));
//# sourceMappingURL=Fayde.Drawing.js.map
