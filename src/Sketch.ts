/// <reference path="Fayde.d.ts" />

module Fayde.Drawing {
    export class Sketch extends Fayde.Controls.Control {

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
        }
    }

}