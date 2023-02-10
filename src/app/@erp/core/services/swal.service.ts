import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ISwal } from '@erp-core/interfaces/swal.interface';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }
  
  toast(params: ISwal) {
    Swal.fire({
      toast: true,
      title: params.title,
      text: params.text,
      icon: params.icon,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
  }

  modal(params: ISwal) {
    Swal.fire({
      title: params.title,
      text: params.text,
      icon: params.icon,
      confirmButtonText: 'Cool'
    });
  }
  
}
