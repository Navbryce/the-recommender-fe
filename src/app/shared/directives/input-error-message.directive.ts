import { Directive, DoCheck, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appInputErrorMessage]',
})
export class InputErrorMessageDirective implements DoCheck, OnInit {
  // the form control
  @Input('appInputErrorMessage') inputModel: any;

  constructor(private hostElement: ElementRef) {}

  ngOnInit(): void {
    this.hostElement.nativeElement.classList.add('form-warning');
  }

  ngDoCheck(): void {
    const shouldShow = !this.inputModel.valid && this.inputModel.touched;
    this.hostElement.nativeElement.style.visibility = shouldShow
      ? 'visible'
      : 'hidden';
  }
}
