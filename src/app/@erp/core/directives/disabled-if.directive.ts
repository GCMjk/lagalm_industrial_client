import { Directive, Input } from '@angular/core';
import { NgControl, ControlContainer } from '@angular/forms';

@Directive({
  selector: `
  [formControl][disableControl]
  [formControlName][disableControl]
  `,
  standalone: true
})
export class DisableControlDirective {
  @Input('disableControl') set disable(condition: boolean) {
    const control = this.ngControl.control;

    condition ? control?.disable() : control?.enable();
  }
  constructor(private ngControl: NgControl) { }

}

@Directive({
  selector: `
  [formGroup][disableContainer]
  [formgroupName][disableContainer]
  [formArrayName][disableContainer]
  `,
  standalone: true
})
export class DisableContainerDirective {
  @Input('disableContainer') set disable(condition: boolean) {
    const container = this.controlContainer.control;

    condition ? container?.disable() : container?.enable();
  }
  constructor(private controlContainer: ControlContainer) { }

}
