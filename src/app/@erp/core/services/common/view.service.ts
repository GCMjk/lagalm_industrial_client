import { EventEmitter, Injectable, Output } from '@angular/core';
import { IView } from '@erp-core/interfaces/common/view.interface';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  @Output() getView: EventEmitter<IView> = new EventEmitter();
  public isSlideOver = false;

  constructor() { }

  public toggleSlideOver(){
    this.isSlideOver = !this.isSlideOver;
  }

}
