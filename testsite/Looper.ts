/// <reference path="../src/Fayde.d.ts" />

class Looper{

    public FrameCount: number;
    private _StartTime: number;
    private _Loop: any;
    public Millis: number;
    Tick: Fayde.RoutedEvent<Fayde.RoutedEventArgs> = new Fayde.RoutedEvent<Fayde.RoutedEventArgs>();

    constructor() {
        this.FrameCount = 0;
    }

    Start(): void{
        this._Loop = requestAnimationFrame((timestamp) => this.OnTick(timestamp));
    }

    OnTick(timestamp: number): void{

        if (!this._StartTime) this._StartTime = timestamp;

        this.Millis = timestamp - this._StartTime;
        this.FrameCount++;

        this.Tick.Raise(this, new Fayde.RoutedEventArgs());

        this._Loop = requestAnimationFrame((timestamp) => this.OnTick(timestamp));
    }

    Stop(): void {
        cancelAnimationFrame(this._Loop);
    }
}

export = Looper;