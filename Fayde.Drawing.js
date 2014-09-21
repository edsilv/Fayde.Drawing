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
        var Control = Fayde.Controls.Control;

        var MAX_FPS = 100;
        var MAX_MSPF = 1000 / MAX_FPS;

        var Sketch = (function (_super) {
            __extends(Sketch, _super);
            function Sketch() {
                _super.call(this);
                this._LastVisualTick = new Date(0).getTime();
                this.Draw = new MulticastEvent();
                this.Click = new Fayde.RoutedEvent();
                this.MousePosition = new Point();
                this.DefaultStyleKey = Sketch;

                var lu = this.XamlNode.LayoutUpdater;
                lu.CanHitElement = true;
                lu.IsNeverInsideObject = false;

                this.SizeChanged.Subscribe(this.Sketch_SizeChanged, this);

                this._Timer = new Fayde.ClockTimer();
                this._Timer.RegisterTimer(this);
            }
            Sketch.prototype.CreateLayoutUpdater = function (node) {
                return new SketchLayoutUpdater(node);
            };

            Sketch.prototype.OnTicked = function (lastTime, nowTime) {
                if (!this.IsAnimated)
                    return;

                var now = new Date().getTime();
                if (now - this._LastVisualTick < MAX_MSPF)
                    return;
                this._LastVisualTick = now;

                this.Milliseconds = nowTime;

                this.XamlNode.LayoutUpdater.InvalidateSubtreePaint();
            };

            Sketch.prototype.OnIsAnimatedChanged = function (args) {
            };

            Sketch.prototype.Sketch_SizeChanged = function (sender, e) {
                this.XamlNode.LayoutUpdater.Canvas.width = e.NewSize.Width;
                this.XamlNode.LayoutUpdater.Canvas.height = e.NewSize.Height;
            };

            Sketch.prototype.OnMouseEnter = function (e) {
                _super.prototype.OnMouseEnter.call(this, e);
            };

            Sketch.prototype.OnMouseLeave = function (e) {
                _super.prototype.OnMouseLeave.call(this, e);
            };

            Sketch.prototype.OnMouseMove = function (e) {
                _super.prototype.OnMouseMove.call(this, e);

                this.MousePosition = e.GetPosition(this);
            };

            Sketch.prototype.OnMouseLeftButtonDown = function (e) {
                _super.prototype.OnMouseLeftButtonDown.call(this, e);
            };

            Sketch.prototype.OnMouseLeftButtonUp = function (e) {
                _super.prototype.OnMouseLeftButtonUp.call(this, e);
            };

            Sketch.prototype.OnTouchDown = function (e) {
                _super.prototype.OnTouchDown.call(this, e);
            };
            Sketch.IsAnimatedProperty = DependencyProperty.Register("IsAnimated", function () {
                return Boolean;
            }, Sketch, false, function (d, args) {
                return d.OnIsAnimatedChanged(args);
            });
            return Sketch;
        })(Control);
        Drawing.Sketch = Sketch;

        var SketchLayoutUpdater = (function (_super) {
            __extends(SketchLayoutUpdater, _super);
            function SketchLayoutUpdater(node) {
                _super.call(this, node);
                this.Canvas = document.createElement('canvas');
                this.SetContainerMode(true);
            }
            SketchLayoutUpdater.prototype.Render = function (ctx, region) {
                ctx.save();
                this.RenderLayoutClip(ctx);
                this.RaiseDraw();
                var w = this.ActualWidth;
                var h = this.ActualHeight;
                ctx.drawImage(this.Canvas, 0, 0, w, h, 0, 0, w, h);
                ctx.restore();
            };

            SketchLayoutUpdater.prototype.RaiseDraw = function () {
                var sketch = this.Node.XObject;
                var session = new Drawing.SketchSession(this.Canvas, this.ActualWidth, this.ActualHeight, sketch.Milliseconds);
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
        var SketchContext = (function () {
            function SketchContext() {
                this._IsSetup = false;
                this.FrameCount = 0;
            }

            Object.defineProperty(SketchContext.prototype, "SketchSession", {
                get: function () {
                    return this._SketchSession;
                },
                set: function (value) {
                    this._SketchSession = value;

                    if (!this._IsSetup) {
                        this.Setup();
                        this._IsSetup = true;
                    }

                    this.Draw();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SketchContext.prototype, "Ctx", {
                get: function () {
                    return this.SketchSession.Ctx;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SketchContext.prototype, "Width", {
                get: function () {
                    return this.Ctx.canvas.width;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SketchContext.prototype, "Height", {
                get: function () {
                    return this.Ctx.canvas.height;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SketchContext.prototype, "Milliseconds", {
                get: function () {
                    return this.SketchSession.Milliseconds;
                },
                enumerable: true,
                configurable: true
            });

            SketchContext.prototype.Setup = function () {
            };

            SketchContext.prototype.Draw = function () {
                this.FrameCount++;
            };
            return SketchContext;
        })();
        Drawing.SketchContext = SketchContext;
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
            function SketchSession(canvas, width, height, milliseconds) {
                this._Canvas = canvas;
                this._Canvas.width = width;
                this._Canvas.height = height;
                this.Ctx = canvas.getContext('2d');
                Object.defineProperty(this, 'Width', { value: width, writable: false });
                Object.defineProperty(this, 'Height', { value: height, writable: false });
                this.Milliseconds = milliseconds;
            }
            return SketchSession;
        })();
        Drawing.SketchSession = SketchSession;
    })(Fayde.Drawing || (Fayde.Drawing = {}));
    var Drawing = Fayde.Drawing;
})(Fayde || (Fayde = {}));
//# sourceMappingURL=Fayde.Drawing.js.map
