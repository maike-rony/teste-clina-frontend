import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFormRoom } from '../../interface/formRoom.interface';
import { IRoom } from '../../interface/room.interface';

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.scss']
})
export class ListRoomComponent implements OnInit {
    
  
  @Input() room!: IRoom;
  @Input() formRoom!: IFormRoom;  
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {}

  reservarRoom(room: IRoom) {           
    this.router.navigate([`/reserve/${room.roomid}/${this.formRoom.period}`]);
  }

}
