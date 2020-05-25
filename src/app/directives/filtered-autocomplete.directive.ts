import {AfterContentInit, Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {MatInput} from '@angular/material/input';

@Directive({
  selector: '[appFilteredAutocomplete]'
})
export class FilteredAutocompleteDirective implements AfterContentInit, OnChanges {
  private normalizedOptions: {value: any; normalizedText: string }[];

  @Input('appFilteredAutocomplete') options: any[];
  @Output() filteredOptionsEmitter = new EventEmitter<any>();

  constructor(private input: MatInput) { }

  ngAfterContentInit(): void {
    this.input.ngControl.control.valueChanges.subscribe((newValue: string) => this.inputUpdated(newValue));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.normalizedOptions = this.options.map((option: any) => {
      return {value: option, normalizedText: option.toString().toLowerCase()};
    });
  }

  private inputUpdated(newValue: string) {
    const filteredOptions = this.normalizedOptions
      .filter((normalizedOption) => normalizedOption.normalizedText.includes(newValue.toLowerCase()))
      .map(valueDict => valueDict.value);
    this.filteredOptionsEmitter.emit(filteredOptions);
  }
}
