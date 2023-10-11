import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewAuthorizedPerson } from '../Models/Bodies';
import { PostResponse } from '../Models/Responses';

const BackEndApi = environment.urlBackend;

const httpOptions = {

  headers: new HttpHeaders({ 'Content-Type': 'application/json' })

}
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) {}

  registerNewAuthorizedPerson(name: string, base64images: string[]){

    let url = BackEndApi + "/authorizedPersons/register"

    let bodyRequest = new NewAuthorizedPerson(name, base64images);

    return this.http.post<PostResponse>(url, bodyRequest, httpOptions)

  }

}
