import { Component } from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent {

  public user: any = {};

  constructor() {
    let str_user: any = localStorage.getItem('user');
    this.user = JSON.parse(str_user);
  }

  logOut() {
    localStorage.clear();
    window.location.reload();
  }

}
