import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ControlService } from '../services/control.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    public router: Router, 
    public dialog: MatDialog,
    private serviceControl: ControlService
  ) { }

  public isAuthenticated: boolean = false; 
  
  async canActivate(): Promise<Boolean | any> {     
    try {
      if (this.serviceControl.getTokenSessionStorage() != null) {      
        this.isAuthenticated = true   
      } 
      else { 
        console.log('Usuário Sem Token!')
        this.router.navigate(['login']);          
      }
      return this.isAuthenticated;             
    }                 
    catch(erro) {
      this.router.navigate(['login']);   
      return this.isAuthenticated;  
    }
  }
}
