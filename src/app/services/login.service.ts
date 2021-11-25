import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { catchError, map } from "rxjs/operators";;
import { ControlService } from './control.service';

interface Login {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  constructor(
    public http: HttpClient,
    private serviceControl: ControlService
  ) { }

  /* POST Login */
  loginForm(login: Login): Observable<any> {       
    return this.http.post(this.serviceControl.getServer() + '/auth', login).pipe(            
      map((obj) => obj),
      catchError((e) => this.serviceControl.errorHandler(e.error))     
    );  
  }

 
  
}
