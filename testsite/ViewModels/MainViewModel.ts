/// <reference path="../../Fayde.Drawing.d.ts" />

class MainViewModel extends Fayde.MVVM.ViewModelBase {

    constructor() {
        super();
    }

    Draw(e: Fayde.IEventBindingArgs<Fayde.Drawing.SketchDrawEventArgs>){
        console.log(e.args.SketchSession);
    }
}
export = MainViewModel;