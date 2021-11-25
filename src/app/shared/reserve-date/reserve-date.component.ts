import { Component, Input, OnInit } from '@angular/core';
import { IRoom } from './../../interface/room.interface';
import { RoomsService } from './../../services/rooms.service';
import { ControlService } from './../../services/control.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserve-date',
  templateUrl: './reserve-date.component.html',
  styleUrls: ['./reserve-date.component.scss']
})
export class ReserveDateComponent implements OnInit {

  @Input() itemSchedule!: any;
  @Input() findRoom!: any;
  @Input() idRoom!: number;

  public idSchedule!: number;
  public timeStart!: string;
  public timeEnd!: string;
  public dataRoom!: IRoom;

  constructor(
    public roomService: RoomsService,
    private serviceControl: ControlService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itemSchedule = this.groupByPeriodArray(this.itemSchedule)
    this.getRoomData(this.idRoom)
  }

  getRoomData(idRoom: number) {
    this.roomService.getRoom(idRoom).subscribe(response => {
      if (response.body) {
        this.dataRoom = response.body
      }
    })
  }

  groupByPeriodArray(itemSchedule: any) {
    return itemSchedule.reduce((r: { [x: string]: any; }, a: { period: string | number; }) => {
      r[a.period] = [...r[a.period] || [], a]
      return r;
    }, {})
  }

  reservarRoom() {
    this.roomService.postReserve(this.idSchedule).subscribe(response=>{
      if (response.body) {
        this.serviceControl.showMessageSuccess('Sala Reservada com Sucesso!')
        this.router.navigate(['/home']);
      }
    })
  }

  setIdSchedule(id: number, timeStart: string, timeEnd: string) {    
    this.idSchedule = id
    this.timeStart = timeStart
    this.timeEnd = timeEnd
  }

  getArray(valor: any) {
    return this.itemSchedule[valor]
  }

  returnDay(date: string) {
    return new Date(date).getDate()
  }

  returnMouthName(date: string) {
    var nameMouts = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro'
    ];
    return nameMouts[new Date(date).getMonth()]
  }

}

