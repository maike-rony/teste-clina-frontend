import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ControlService } from './control.service';


@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(
    public http: HttpClient,
    private serviceControl: ControlService
  ) { }

  getListRoomDate(date: string) {
    return this.http.get(this.serviceControl.getServer() + `/room?date=${date}`, this.serviceControl.setTokenHeader()).pipe(
      map((obj) => obj)
    );
  }

  getListSchedule(id: number) {
    return this.http.get(this.serviceControl.getServer() + `/schedule/${id}`, this.serviceControl.setTokenHeader()).pipe(
      map((obj) => obj),
      catchError((e) => this.serviceControl.errorHandler(e))
    );
  }

  getRoom(id: number) {
    return this.http.get(this.serviceControl.getServer() + `/room/${id}`, this.serviceControl.setTokenHeader()).pipe(
      map((obj) => obj),
      catchError((e) => this.serviceControl.errorHandler(e))
    );
  }

  postReserve(id: number) {
    const postRequest = {
      scheduleId: id
    }
    return this.http.post(this.serviceControl.getServer() + `/schedule`, postRequest, this.serviceControl.setTokenHeader()).pipe(
      map((obj) => obj),
      catchError((e) => this.serviceControl.errorHandler(e))
    );
  }
}
