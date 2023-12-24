export class NewAuthorizedPerson {

    name:string;
    images: string[];

    constructor(name: string, images: string[]) {

        this.name = name;
        this.images = images;
        
    }

}

export class  NewIp {

    ip: string;

    constructor(ip:string){

        this.ip = ip

    }

}

export class NewWhatsAppNumber {

    number: string;

    constructor(number:string) {

        this.number = number

    }

}

export class NewTimeInterval {

    start:string;
    
    end: string;

    constructor(start:string, end:string) {

        this.start = start

        this.end = end

    }

}

export class RequestById {

    id:number;

    constructor(id:number){

        this.id = id

    }

}

export class UploadSingleImage extends RequestById {

    images: string[]

    constructor(id:number, images: string[]) {

        super(id);
        this.images = images;

    }

}

export class LogIn {

    device:string;
    password:string;

    constructor(device:string, password:string) {

        this.device = device
        this.password = password

    }

}

export class RequestByToken {

    token: string;

    constructor(token:string) {

        this.token = token

    }


}

export class UpdatePassword {

    device:string;

    currentPassword: string;

    newPassword: string;

    constructor(device:string, currentPassword:string, newPassword:string){

        this.device = device;

        this.currentPassword = currentPassword;

        this.newPassword = newPassword;

    }

}
