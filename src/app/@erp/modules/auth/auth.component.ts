import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `
    <div class="flex min-h-full">
      <div class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 z-10 shadow-2xl shadow-slate-800">
          <router-outlet></router-outlet>
      </div>
      <div class="relative hidden w-0 flex-1 lg:block">
          <img 
          class="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
          >
      </div>
    </div>
  `
})
export class AuthComponent {

}
