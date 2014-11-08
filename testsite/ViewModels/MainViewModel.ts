import Clock = require("../Clock");

class MainViewModel extends Fayde.MVVM.ViewModelBase {

    private _LondonClock: Clock;
    private _AucklandClock: Clock;

    public _LondonMeridian: string;
    public _AucklandMeridian: string;

    get LondonMeridian (): string {
        return this._LondonMeridian;
    }

    set LondonMeridian (value: string) {
        this._LondonMeridian = value;
        this.OnPropertyChanged("LondonMeridian");
    }

    get AucklandMeridian (): string {
        return this._AucklandMeridian;
    }

    set AucklandMeridian (value: string) {
        this._AucklandMeridian = value;
        this.OnPropertyChanged("AucklandMeridian");
    }

    constructor () {
        super();

        this._LondonClock = new Clock(1); // UTC + 1 hr
        this._AucklandClock = new Clock(12); // UTC + 12 hrs
    }

    LondonClock_Draw (e: Fayde.IEventBindingArgs<Fayde.Drawing.SketchDrawEventArgs>) {

        if (!this._LondonClock.Ctx) this._LondonClock.Ctx = e.args.SketchSession.Ctx;

        this._LondonClock.Draw();

        this.LondonMeridian = this._LondonClock.GetMeridian();
    }

    LondonClock_MouseDown (e: any) {
        console.log(e.args.Source.MousePosition.X);
    }

    AucklandClock_Draw (e: Fayde.IEventBindingArgs<Fayde.Drawing.SketchDrawEventArgs>) {

        if (!this._AucklandClock.Ctx) this._AucklandClock.Ctx = e.args.SketchSession.Ctx;

        this._AucklandClock.Draw();

        this.AucklandMeridian = this._AucklandClock.GetMeridian();
    }
}
export = MainViewModel;