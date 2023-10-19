import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestById , NewAuthorizedPerson, NewIp, NewTimeInterval, NewWhatsAppNumber, UploadSingleImage, LogIn, RequestByToken } from '../Models/Bodies';
import { DeleteResponse, GetAuthorizedUsersResponse, GetImagesFromPersonResponse, GetProcessingServerIpResponse, GetVigilanceIntervalResponse, GetWhatsAppNumberResponse, RequestsOptionalTokens, PostResponse, PutResponse, Response} from '../Models/Responses';

const BackEndApi = environment.urlBackend;

const httpOptions = {

  headers: new HttpHeaders({ 'Content-Type': 'application/json' })

}
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient){}

  registerNewAuthorizedPerson(name: string, base64images: string[]){

    let url = BackEndApi + "/authorizedPersons/register"

    let bodyRequest = new NewAuthorizedPerson(name, base64images)

    return this.http.post<PostResponse>(url, bodyRequest, httpOptions)

  }

  updateProcessingServerIp(ip:string){

    let url = BackEndApi +  "/rpiconfig/updateProcessingServerIP"

    let bodyRequest = new NewIp(ip)

    return this.http.put<PutResponse>(url, bodyRequest, httpOptions)

  }

  updateWhatsAppNumber(number:string) {

    let url = BackEndApi +  "/rpiconfig/updateWhatsAppNumber"

    let bodyRequest = new NewWhatsAppNumber(number)

    return this.http.put<PutResponse>(url, bodyRequest, httpOptions)

  }

  updateVigilanceTimeInterval(start:string, end:string) {

    let url = BackEndApi + "/rpiconfig/updateVigilanceTime"

    let bodyRequest = new NewTimeInterval(start, end)

    return this.http.put<PutResponse>(url, bodyRequest, httpOptions)

  }

  getProcessingServerIp(){

    let url = BackEndApi + "/rpiconfig/currentIp"

    return this.http.get<GetProcessingServerIpResponse>(url, httpOptions)

  }

  getVigilanceIntervalTime(){

    let url = BackEndApi + "/rpiconfig/vigilanceTime"

    return this.http.get<GetVigilanceIntervalResponse>(url, httpOptions)

  }

  getWhatsAppNumber(){

    let url = BackEndApi + "/rpiconfig/whatsAppNumber"

    return this.http.get<GetWhatsAppNumberResponse>(url, httpOptions)

  }

  getAuthorizedPersons(){

    let url = BackEndApi + "/authorizedPersons/get"

    return this.http.get<GetAuthorizedUsersResponse>(url, httpOptions)

  }


  deleteAuthorizedPerson(id:number){

    let url = BackEndApi + "/authorizedPersons/deleteAuthorizedPerson"

    let options = {

      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: new RequestById(id)

    } 

    return this.http.delete<DeleteResponse>(url, options)

  }

  getImagesFromAuthorizedPerson(id:number){

    let url =  BackEndApi + "/authorizedPersons/getImages/"+id

    return this.http.get<GetImagesFromPersonResponse>(url, httpOptions)

  }

  deleteImageFromAuthorizedPerson(id:number, key:string) {

    let url = BackEndApi + "/authorizedPersons/deleteImage/id/" + id + "/key/" + key

    return this.http.delete<DeleteResponse>(url, httpOptions)


  }

  uploadNewImageFromAuthorizedUser(personId: number, base64images: string[]){

    let url = BackEndApi + "/authorizedPersons/uploadSingleImage"

    let body = new UploadSingleImage(personId, base64images)

    return this.http.post<PostResponse>(url, body, httpOptions)

  }

  logIn(device:string, password:string) {

    let url = BackEndApi + "/session/logIn"

    let body = new LogIn(device, password);

    return this.http.post<RequestsOptionalTokens>(url, body, httpOptions)

  }

  logOut(refreshToken: string) {

    let url = BackEndApi + '/session/logOut'

    let body = new RequestByToken(refreshToken)

    return this.http.post<PostResponse>(url, body, httpOptions)

  }

  verifyToken(){

    let url = BackEndApi + "/session/verify"

    const httpOptionsAuthorization = {

      headers: new HttpHeaders({
    
        'Content-Type': 'application/json',
        
        'authorization' : `Bearer ${sessionStorage.getItem('token')}`
    
      })
    
    }

    return this.http.get<Response>(url, httpOptionsAuthorization)

  }


  refreshToken(refreshtoken:string) {

    let url = BackEndApi + "/session/refreshToken"

    let body = new RequestByToken(refreshtoken)

    return this.http.post<RequestsOptionalTokens>(url, body, httpOptions)

  }

  updateEmbeddingsNotification() {

    let url = BackEndApi + "/embeddings/update"

    return this.http.put<PutResponse>(url,httpOptions)

  }



}
