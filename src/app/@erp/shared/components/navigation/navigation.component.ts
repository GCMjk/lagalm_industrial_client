import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'erp-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [ 
    trigger('opacityScale', [
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

  isOffCanvasMenu = false;
  isMenu = false;
  isOffCanvasMenuDialog = false;
  public user: any = {};

  constructor() {
    let str_user: any = localStorage.getItem('user');
    this.user = JSON.parse(str_user);
  }

  toggleOffCanvasMenu(){
    this.isOffCanvasMenu = !this.isOffCanvasMenu;
    
    if (this.isOffCanvasMenuDialog){
      setTimeout(() => {
        this.isOffCanvasMenuDialog = !this.isOffCanvasMenuDialog;
      },400)
    } else {
      this.isOffCanvasMenuDialog = !this.isOffCanvasMenuDialog;
    }
  }
  
  toggleMenu(){
    this.isMenu = !this.isMenu;
  }

  logOut() {
    localStorage.clear();
    window.location.reload();
  }

}
