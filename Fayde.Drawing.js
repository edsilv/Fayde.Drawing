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
        var Sketch = (function (_super) {
            __extends(Sketch, _super);
            function Sketch() {
                _super.call(this);
                this.DefaultStyleKey = this.constructor;
            }
            Sketch.prototype.OnApplyTemplate = function () {
                _super.prototype.OnApplyTemplate.call(this);
            };
            return Sketch;
        })(Fayde.Controls.Control);
        Drawing.Sketch = Sketch;
    })(Fayde.Drawing || (Fayde.Drawing = {}));
    var Drawing = Fayde.Drawing;
})(Fayde || (Fayde = {}));
//# sourceMappingURL=Fayde.Drawing.js.map
