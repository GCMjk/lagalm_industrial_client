import { Injectable } from '@angular/core';
import { IView } from '@erp-core/interfaces/common/view.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  private viewObservablePrivate: BehaviorSubject<IView> = new BehaviorSubject<IView>({
    type: 'Tipo',
    _id: '',
    id: '',
    img: '/assets/lagalm.png',
    name: '',
    description: '',
    status: true,
    edit: {
      route: []
    }
  });
  public isSlideOver = false;

  constructor() { }

  get viewObservable() {
    return this.viewObservablePrivate.asObservable();
  }

  viewObservableData(view: IView) {
    this.viewObservablePrivate.next(view);
  }

  public toggleSlideOver(){
    this.isSlideOver = !this.isSlideOver;
  }

}
