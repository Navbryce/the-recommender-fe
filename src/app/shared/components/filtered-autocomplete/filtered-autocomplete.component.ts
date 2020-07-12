import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatAutocomplete } from '@angular/material/autocomplete';

@Component({
  selector: 'app-filtered-autocomplete',
  templateUrl: './filtered-autocomplete.component.html',
  styleUrls: ['./filtered-autocomplete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilteredAutocompleteComponent
  implements OnChanges, OnInit, AfterViewInit {
  private inputValueChangeEmitter: Subject<any> = new BehaviorSubject<any>(
    null
  );
  private matAutoCompleteSubject: Subject<MatAutocomplete> = new ReplaySubject<
    MatAutocomplete
  >();

  public filteredOptions: Observable<any[]>;
  public matAutocomplete: Observable<
    MatAutocomplete
  > = this.matAutoCompleteSubject.asObservable();

  @Input() options: any[];
  @Input() inputControl: AbstractControl;

  @ViewChild(MatAutocomplete) matAutocompleteChild: MatAutocomplete;

  constructor() {
    this.filteredOptions = this.inputValueChangeEmitter
      .asObservable()
      .pipe(map((value) => this.filter(value)));
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    setTimeout(
      () => this.matAutoCompleteSubject.next(this.matAutocompleteChild),
      0
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.inputControl.valueChanges.subscribe((value) =>
      this.inputValueChanged(value)
    );
  }

  private inputValueChanged(value: any | null) {
    this.inputValueChangeEmitter.next(value);
  }

  private filter(value: any | null): any[] {
    if (value == null) {
      return this.options;
    }
    return this.options
      .map((option) => option.toString().toLowerCase())
      .filter((optionString) => optionString.includes(value));
  }
}
