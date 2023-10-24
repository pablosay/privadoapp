import { CanActivateFn, Router } from '@angular/router';
import { Observable, of, mergeMap } from 'rxjs';
import { BackendService } from '../Services/backend.service';
import { inject } from '@angular/core';
import { Response,RequestsOptionalTokens } from '../Models/Responses';


export const authorizationGuard: CanActivateFn = (route, state) => {

  const backend:BackendService = inject(BackendService)

  const router: Router = inject(Router)

  console.log("Token: ", sessionStorage.getItem('authorizationToken'))

  return backend.verifyToken().pipe(mergeMap( (response:Response) => {

    if(response.message == "Token accepted") {

      console.log("Debe de llegar aca")

      return of(true)

    } else if(response.message == "Invalidad token"){

      console.log("Token invalido")

      if(sessionStorage.getItem('authorizationToken') != null && sessionStorage.getItem('refreshToken') != null) {

        return backend.refreshToken(sessionStorage.getItem('refreshToken')!).pipe(mergeMap ((refreshResponse:RequestsOptionalTokens) => {

          if(refreshResponse.message == "Token refreshed") {

            sessionStorage.setItem('authorizationToken', refreshResponse.authorizationToken!)

            sessionStorage.setItem('refreshToken', refreshResponse.refreshToken!)

            return of(true)

          } else {

            return of(router.createUrlTree([""]))

          }

        }))

      } else {

        return of(router.createUrlTree([""]))

      }


    } else if(response.message == "There is no token on the header"){

      return of(router.createUrlTree([""]))

    }


    return of(true)


  } ))

  


};
