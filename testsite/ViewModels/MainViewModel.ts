/// <reference path="../../Fayde.Drawing.d.ts" />

class MainViewModel extends Fayde.MVVM.ViewModelBase {

    constructor() {
        super();
    }

    Draw(e: Fayde.IEventBindingArgs<Fayde.Drawing.SketchDrawEventArgs>){
        e.args.SketchSession.FillRect(0, 0, 800, 600);
    }
}
export = MainViewModel;