import { Component, Input } from '@angular/core';

@Component({
  selector: 'erp-header',
  template: `
    <h1 class="text-2xl font-bold leading-6 text-gray-900">{{title[0]}}</h1>
    <p class="mt-2 text-sm text-gray-600">{{title[1]}}</p>
  `
})
export class HeaderComponent {
  @Input() title: Array<string> = ['Dashboard', 'Seleccione una acción'];

}
