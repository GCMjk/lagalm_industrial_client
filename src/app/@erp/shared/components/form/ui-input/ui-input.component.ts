import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'ui-input',
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.scss']
})
export class UiInputComponent implements OnInit{

  @Input() id: string | undefined
  @Input() label: string = 'Campo';
  @Input() type: string = 'text';
  @Input() ph: string = 'Ingresa un dato';
  @Input() required: boolean = false;
  @Input() control!: AbstractControl;
  @Input() errors: Array<any> | undefined;

  ngOnInit(): void {
    console.log(this.control.invalid && (this.control.dirty || this.control.touched))
  }

}
