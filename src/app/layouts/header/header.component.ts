import { Component, OnInit } from '@angular/core';
import { ControlService } from '../../services/control.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private serviceControl: ControlService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.serviceControl.logout()
  }

}
