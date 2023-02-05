import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

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
