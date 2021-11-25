import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ISchdeule } from './../../interface/schedule.interface';
import { RoomsService } from './../../services/rooms.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {

  public findRoom!: FormGroup;
  public id: number;
  public period: string;
  public dataSchedule!: Array<ISchdeule>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public roomService: RoomsService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get("id"))
    this.period = String(this.route.snapshot.paramMap.get("period"))
    this.findRoom = this.formBuilder.group({
      date: [{
        value: null,
        disabled: true
      }],
      period: [{
        value: this.period,
        disabled: true
      }]
    });
  }

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm() {
    this.roomService.getListSchedule(this.id).subscribe((result: any) => {
      if (result.body) {
        this.dataSchedule = result.body    
        this.findRoom.get('date')?.setValue(new Date(parseInt(Object.keys(this.dataSchedule)[0])))
      }
    })
  }

  returnDay(date: string) {
    return new Date(parseInt(date)).getDate()
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
    return nameMouts[new Date(parseInt(date)).getMonth()]
  }

}
