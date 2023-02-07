import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

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
