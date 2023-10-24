import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestById , NewAuthorizedPerson, NewIp, NewTimeInterval, NewWhatsAppNumber, UploadSingleImage, LogIn, RequestByToken } from '../Models/Bodies';
import { DeleteResponse, GetAuthorizedUsersResponse, GetImagesFromPersonResponse, GetProcessingServerIpResponse, GetVigilanceIntervalResponse, GetWhatsAppNumberResponse, RequestsOptionalTokens, PostResponse, PutResponse, Response, RequestEntriesResponse, RequestIntrudersResponse, GetStatusResponse} from '../Models/Responses';

const BackEndApi = environment.urlBackend;

const httpOptions = {

  headers: new HttpHeaders({
    
    'Content-Type': 'application/json',
    'authorization' : `Bearer ${sessionStorage.getItem('authorizationToken')}`

  })

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

      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'authorization' : `Bearer ${sessionStorage.getItem('authorizationToken')}` }),
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

/** ------ Desde aca      */
  logIn(device:string, password:string) {

    let url = BackEndApi + "/session/logIn"

    let body = new LogIn(device, password);

    const httpOptionsAuthorization = {

      headers: new HttpHeaders({
    
        'Content-Type': 'application/json',
    
      })
    
    }

    return this.http.post<RequestsOptionalTokens>(url, body, httpOptionsAuthorization)

  }

  logOut(refreshToken: string) {

    let url = BackEndApi + '/session/logOut'

    let body = new RequestByToken(refreshToken)

    const httpOptionsAuthorization = {

      headers: new HttpHeaders({
    
        'Content-Type': 'application/json',
    
      })
    
    }

    return this.http.post<PostResponse>(url, body, httpOptionsAuthorization)

  }

  verifyToken(){

    let url = BackEndApi + "/session/verify"

    return this.http.get<Response>(url, httpOptions)

  }

  refreshToken(refreshtoken:string) {

    let url = BackEndApi + "/session/refreshToken"

    let body = new RequestByToken(refreshtoken)

    const httpOptionsAuthorization = {

      headers: new HttpHeaders({
    
        'Content-Type': 'application/json',
    
      })
    
    }

    return this.http.post<RequestsOptionalTokens>(url, body, httpOptionsAuthorization)

  }
/** ------- hasta aca      */
  updateEmbeddingsNotification() {

    let url = BackEndApi + "/embeddings/update"

    console.log(httpOptions)

    return this.http.put<PutResponse>(url,null, httpOptions)

  }

  getEntries(){

    let url = BackEndApi + "/log/entries"

    return this.http.get<RequestEntriesResponse>(url, httpOptions)

  }

  getIntruders(){

    let url = BackEndApi + "/log/intruders"

    return this.http.get<RequestIntrudersResponse>(url, httpOptions)

  }

  getDeviceStatus(){

    let url = BackEndApi + "/rpiconfig/status"

    return this.http.get<GetStatusResponse>(url, httpOptions)

  }

  setDeviceStatus(){

    let url = BackEndApi + "/rpiconfig/status/activate"

    return this.http.put<PutResponse>(url,null ,httpOptions)

  }



}
