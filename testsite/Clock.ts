/// <reference path="./lib/moment/moment.d.ts" />

class Clock {

    private _Ctx: CanvasRenderingContext2D;
    public Time: Moment;

    /**
     * @param {CanvasRenderingContext2D} Canvas rendering context to draw to
     * @param {Number} Number of hours ahead/behind UTC
     */
    constructor(ctx: CanvasRenderingContext2D, hours: number = 0) {
        this._Ctx = ctx;
        this.Time = moment.utc().add(hours, 'hours');
    }

    Draw(){
        var now = this.Time.toDate();
        this._Ctx.save();
        this._Ctx.clearRect(0,0,150,150);
        this._Ctx.translate(75,75);
        this._Ctx.scale(0.4,0.4);
        this._Ctx.rotate(-Math.PI/2);
        this._Ctx.strokeStyle = "black";
        this._Ctx.fillStyle = "white";
        this._Ctx.lineWidth = 8;
        this._Ctx.lineCap = "round";

        // Hour marks
        this._Ctx.save();
        for (var i=0;i<12;i++){
            this._Ctx.beginPath();
            this._Ctx.rotate(Math.PI/6);
            this._Ctx.moveTo(100,0);
            this._Ctx.lineTo(120,0);
            this._Ctx.stroke();
        }
        this._Ctx.restore();

        // Minute marks
        this._Ctx.save();
        this._Ctx.lineWidth = 5;
        for (i=0;i<60;i++){
            if (i%5!=0) {
                this._Ctx.beginPath();
                this._Ctx.moveTo(117,0);
                this._Ctx.lineTo(120,0);
                this._Ctx.stroke();
            }
            this._Ctx.rotate(Math.PI/30);
        }
        this._Ctx.restore();

        var sec = now.getSeconds();
        var min = now.getMinutes();
        var hr  = now.getHours();
        hr = hr>=12 ? hr-12 : hr;

        this._Ctx.fillStyle = "black";

        // write Hours
        this._Ctx.save();
        this._Ctx.rotate( hr*(Math.PI/6) + (Math.PI/360)*min + (Math.PI/21600)*sec )
        this._Ctx.lineWidth = 14;
        this._Ctx.beginPath();
        this._Ctx.moveTo(-20,0);
        this._Ctx.lineTo(80,0);
        this._Ctx.stroke();
        this._Ctx.restore();

        // write Minutes
        this._Ctx.save();
        this._Ctx.rotate( (Math.PI/30)*min + (Math.PI/1800)*sec )
        this._Ctx.lineWidth = 10;
        this._Ctx.beginPath();
        this._Ctx.moveTo(-28,0);
        this._Ctx.lineTo(112,0);
        this._Ctx.stroke();
        this._Ctx.restore();

        // Write seconds
        this._Ctx.save();
        this._Ctx.rotate(sec * Math.PI/30);
        this._Ctx.strokeStyle = "#D40000";
        this._Ctx.fillStyle = "#D40000";
        this._Ctx.lineWidth = 6;
        this._Ctx.beginPath();
        this._Ctx.moveTo(-30,0);
        this._Ctx.lineTo(83,0);
        this._Ctx.stroke();
        this._Ctx.beginPath();
        this._Ctx.arc(0,0,10,0,Math.PI*2,true);
        this._Ctx.fill();
        this._Ctx.beginPath();
        this._Ctx.arc(95,0,10,0,Math.PI*2,true);
        this._Ctx.stroke();
        this._Ctx.fillStyle = "rgba(0,0,0,0)";
        this._Ctx.arc(0,0,3,0,Math.PI*2,true);
        this._Ctx.fill();
        this._Ctx.restore();

        this._Ctx.beginPath();
        this._Ctx.lineWidth = 14;
        this._Ctx.strokeStyle = '#325FA2';
        this._Ctx.arc(0,0,142,0,Math.PI*2,true);
        this._Ctx.stroke();

        this._Ctx.restore();
    }
}

export = Clock;