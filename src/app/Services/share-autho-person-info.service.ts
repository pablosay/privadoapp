import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';
import { AuthorizedPerson } from '../Models/Models';

@Injectable({
  providedIn: 'root'
})
export class ShareAuthoPersonInfoService {

  private sharedAuthorizedPeron = new BehaviorSubject<AuthorizedPerson>( new AuthorizedPerson(0,""))

  getAuthorizedPerson(): Observable<AuthorizedPerson> {

    return this.sharedAuthorizedPeron

  }

  setAuthorizedPerson(newAuthoPerson: AuthorizedPerson) {

    this.sharedAuthorizedPeron.next(newAuthoPerson)

    

  }

}
