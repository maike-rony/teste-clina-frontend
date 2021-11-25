import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { RoomsService } from './../../services/rooms.service';
import { ControlService } from 'src/app/services/control.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRoom } from 'src/app/interface/room.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public listRooms: Array<IRoom> = []
  public findRoom: FormGroup;

  constructor(
    public datepipe: DatePipe,
    private roomService: RoomsService,
    private controlService: ControlService,
    private formBuilder: FormBuilder    
  ) {

    this.findRoom = this.formBuilder.group({
      date: [, { validators: [Validators.required], updateOn: "change" }],
      period: [, { validators: [Validators.required], updateOn: "change" }]
    });

  }

  ngOnInit() { }

  changeDataFilter(event: MatDatepickerInputEvent<Date>) {
    const date: string = String(this.datepipe.transform(event.value, 'yyyy-MM-dd'))

    this.roomService.getListRoomDate(date).subscribe((response: any) => {
      if (response.body) {
        this.listRooms = response.body

        if (!this.findRoom.value.period) {
          this.controlService.showMessageSuccess('Selecione um Período que Deseja Agendar!')
        }
      }
    },
      () => {
        this.listRooms = []
        this.controlService.showMessageError('Nenhuma Sala Encontrada para este Dia!')
      })
  }

  changePeriodFilter(event: any) {
    if (!this.findRoom.value.date) {
      this.controlService.showMessageError('Selecione uma Data para Buscar!')
    }
  }
 

}
