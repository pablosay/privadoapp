export class Entry {

    hour:number;
    minute:number;
    date: number;
    month: number;
    year: number;
    person_name: string;

    constructor(hour: number,minute: number , date: number, month:number, year: number, name: string){

        this.hour = hour
        this.minute = minute
        this.date = date
        this.month = month
        this.year = year
        this.person_name = name

    }

}

export class Intruder {

    hour:number;
    minute:number;
    date: number;
    month: number;
    year: number;
    person_name:string;
    image: string;

    constructor(hour: number,minute: number , date: number, month:number, year: number, person_name:string, image: string){

        this.hour = hour
        this.minute = minute
        this.date = date
        this.month = month
        this.year = year
        this.person_name = person_name
        this.image = image

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
