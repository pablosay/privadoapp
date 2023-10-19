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

export class Tech {

    name: string;
    filename:string;
    description: string;

    constructor(name:string, filename:string, description:string){

        this.name = name
        this.filename = filename
        this.description = description

    }

}

export class AuthorizedPerson {

    id: number;
    name:string;

    constructor(id:number, name:string) {

        this.id = id;
        this.name = name

    }

}

export class ImageInformation {

    id:number;
    image_data:string;

    constructor(id:number, image_data: string){

        this.id = id
        this.image_data = image_data

    }

}
