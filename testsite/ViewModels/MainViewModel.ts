/// <reference path="../../Fayde.Drawing.d.ts" />
import Clock = require("../Clock");

class MainViewModel extends Fayde.MVVM.ViewModelBase {

    //private _Sketches: Fayde.IEventBindingArgs<Fayde.Drawing.SketchDrawEventArgs>[] = [];
    //private _Looper: Looper;
    private _LondonClock: Clock;
    private _AucklandClock: Clock;

    public _LondonMeridian: string;
    public _AucklandMeridian: string;

    get LondonMeridian(): string {
        return this._LondonMeridian;
    }

    set LondonMeridian(value: string){
        this._LondonMeridian = value;
        this.OnPropertyChanged("LondonMeridian");
    }

    get AucklandMeridian(): string {
        return this._AucklandMeridian;
    }

    set AucklandMeridian(value: string){
        this._AucklandMeridian = value;
        this.OnPropertyChanged("AucklandMeridian");
    }

    constructor() {
        super();

        this._LondonClock = new Clock(null, 0); // UTC
        this._AucklandClock = new Clock(null, 11); // UTC + 11 hrs

//        this._Looper = new Looper();
//
//        this._Looper.Tick.Subscribe(() => {
//            // invalidates all registered Sketch controls, causing them to repeatedly trigger their Draw event.
//            for (var i = 0; i < this._Sketches.length; i++){
//                var e: Fayde.IEventBindingArgs<Fayde.Drawing.SketchDrawEventArgs>  = this._Sketches[i];
//                e.sender.Node.LayoutUpdater.InvalidateSubtreePaint();
//            }
//        }, this);
//
//        this._Looper.Start();
    }

    LondonClock_Draw(e: Fayde.IEventBindingArgs<Fayde.Drawing.SketchDrawEventArgs>){
//        if (!e.args.SketchSession.Registered) {
//            e.args.SketchSession.Registered = true;
//            this._Sketches.push(e);
//            this._LondonClock = new Clock(e.args.SketchSession.Ctx, 0); // UTC
//        }

        if (!this._LondonClock.Ctx) this._LondonClock.Ctx = e.args.SketchSession.Ctx;

        this._LondonClock.Draw();

        this.LondonMeridian = this._GetMeridian(this._LondonClock.Time);
    }

    AucklandClock_Draw(e: Fayde.IEventBindingArgs<Fayde.Drawing.SketchDrawEventArgs>){
//        if (!e.args.SketchSession.Registered) {
//            e.args.SketchSession.Registered = true;
//            this._Sketches.push(e);
//            this._AucklandClock = new Clock(e.args.SketchSession.Ctx, 11); // UTC + 11 hrs
//        }

        if (!this._AucklandClock.Ctx) this._AucklandClock.Ctx = e.args.SketchSession.Ctx;

        this._AucklandClock.Draw();

        this.AucklandMeridian = this._GetMeridian(this._AucklandClock.Time);
    }

    _GetMeridian(moment: Moment): string {
        var date = moment.toDate();

        var hrs = date.getHours();

        return (hrs > 12) ? 'PM' : 'AM';
    }
}
export = MainViewModel;