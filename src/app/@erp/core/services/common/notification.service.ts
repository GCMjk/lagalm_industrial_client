import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  isNotification = false;
  constructor() { }

  close(){
    this.isNotification = false
  }

  setNotification(title: string, text: string, icon: "success" | "error" | "info" | "warning") {

  }

}
