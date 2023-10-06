export class AuthorizedName {

    name: string;

    constructor(name: string) {
        this.name = name
    }

}

export class Entry {

    hour:number;
    minute:number;
    date: number;
    month: number;
    year: number;
    name: string;

    constructor(hour: number,minute: number , date: number, month:number, year: number, name: string){

        this.hour = hour
        this.minute = minute
        this.date = date
        this.month = month
        this.year = year
        this.name = name

    }

}

export class Spoof {

    hour:number;
    minute:number;
    date: number;
    month: number;
    year: number;
    pictureKey: string;

    constructor(hour: number,minute: number , date: number, month:number, year: number, pictureKey: string){

        this.hour = hour
        this.minute = minute
        this.date = date
        this.month = month
        this.year = year
        this.pictureKey = pictureKey

    }

}
