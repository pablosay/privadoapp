import { AuthorizedPerson, ImageInformation, Entry, Intruder } from "./Models";

export class Response {

    message: string;

    constructor(message: string) {

        this.message = message;

    }
}

export class PostResponse extends Response {
    constructor(message: string) {

        super(message);

    }
}

export class PutResponse extends Response {

    constructor(message: string) {

        super(message);

    }
    
}

export class DeleteResponse extends Response {

    constructor(message:string) {

        super(message)

    }

}

export class GetStatusResponse extends Response {

    status?:string;

    constructor(message:string, status?:string) {

        super(message)

        this.status = status

    }

}

export class GetWhatsAppNumberResponse extends Response {

    number:string;

    constructor(message:string, number:string) {

        super(message);

        this.number = number

    }

}

export class GetProcessingServerIpResponse extends Response {

    ip?:string;

    constructor(message:string, ip?:string) {

        super(message);

        this.ip = ip

    }

}

export class GetVigilanceIntervalResponse extends Response {

    start?:string;
    end?:string;

    constructor(message:string, start?:string, end?:string) {

        super(message);

        this.start = start

        this.end = end

    }

}

export class GetAuthorizedUsersResponse extends Response {

    authorizedUsers?: AuthorizedPerson[]

    constructor(message: string, authorizedUsers?: AuthorizedPerson[]) {

        super(message)

        this.authorizedUsers = authorizedUsers

    }

}

export class GetImagesFromPersonResponse extends Response {

    images?: ImageInformation[];

    constructor(message:string, images?: ImageInformation[]){

        super(message)

        this.images = images

    }

}

export class RequestsOptionalTokens extends PostResponse {

    authorizationToken?: string;
    refreshToken?: string;

    constructor(message:string, authorizationToken?:string, refreshToken?:string) {

        super(message)
        this.authorizationToken = authorizationToken
        this.refreshToken = refreshToken
        
    }

}

export class RequestEntriesResponse extends Response{

    entries?: Entry[]

    constructor(message:string, entries?: Entry[]) {

        super(message)

        this.entries = entries

    }

}

export class RequestIntrudersResponse extends Response{

    intruders?: Intruder[]

    constructor(message:string, intruders?: Intruder[]) {

        super(message)

        this.intruders = intruders

    }

}

