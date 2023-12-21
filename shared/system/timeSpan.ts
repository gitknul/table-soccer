export class TimeSpan {
    private _milliseconds: number;

    constructor(milliseconds: number) {
        this._milliseconds = milliseconds;
    }

    static fromMilliseconds(milliseconds: number) {
        return new TimeSpan(milliseconds);
    }

    static fromSeconds(seconds: number) {
        return new TimeSpan(seconds * 1000);
    }

    static fromMinutes(minutes: number) {
        return new TimeSpan(minutes * 1000 * 60);
    }

    get milliseconds() {
        return this._milliseconds;
    }

    get seconds() {
        return this._milliseconds / 1000;
    }

    get minutes() {
        return this._milliseconds / 1000 / 60;
    }

    get hours() {
        return this._milliseconds / 1000 / 60 / 60;
    }
}
