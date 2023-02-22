import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ISwal } from '@erp/core/interfaces/common/swal.interface';

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
    const swalWithButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithButtons.fire({
      title: params.title,
      text: params.text,
      icon: params.icon,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
  
}
