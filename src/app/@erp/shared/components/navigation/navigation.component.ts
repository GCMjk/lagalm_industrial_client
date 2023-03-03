import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [ 
    trigger('AnimationTrigger0', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(.95)' }),
        animate('100ms ease-out', style({  opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('75ms ease-in', style({ opacity: 0, transform: 'scale(.95)' }))
      ])
    ])
  ]
})
export class NavigationComponent {

  isMenu = false;
  public user: any = {};

  constructor() {
    let str_user: any = localStorage.getItem('user');
    this.user = JSON.parse(str_user);
  }

  toggleMenu(){
    this.isMenu = !this.isMenu;
  }

  logOut() {
    localStorage.clear();
    window.location.reload();
  }

}
