import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  baseUrl: string = environment.uri

  constructor(
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  getServer(): string {
    return this.baseUrl;
  }

  logout(): void {
    sessionStorage.clear()
    this.router.navigate(['/login']);
  }

  setTokenSessionStorage(token: string): void {
    sessionStorage.clear()
    return sessionStorage.setItem('token', token)
  }

  getTokenSessionStorage(): string | null {
    const token = sessionStorage.getItem('token')
    return token ? token : null
  }

  setTokenHeader(): any {
    const token = this.getTokenSessionStorage()

    if (token) {
      const httpHeder = new HttpHeaders().set("Authorization", "Bearer " + token);
      return {
        headers: httpHeder.set('Content-type', 'application/json')
      }
    }
    else {
      this.router.navigate(['/login']);
    }

  }

  showMessageSuccess(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ['msg-success']
    })
  }

  showMessageError(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ['msg-error']
    })
  }

  errorHandler(e: any): Observable<any> {    
    this.showMessageError(`Ocorreu um Erro: ${e.message}`);
    return EMPTY;
  }


}
