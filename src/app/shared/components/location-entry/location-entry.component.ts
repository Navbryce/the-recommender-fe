import { Component, forwardRef, OnInit, ViewChild } from '@angular/core';
import { GeoCoordinates } from '../../../data/models/GeoCoordinates.interface';
import { Observable, Subject } from 'rxjs';
import { MatInput } from '@angular/material/input';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-location-entry',
  templateUrl: './location-entry.component.html',
  styleUrls: ['./location-entry.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LocationEntryComponent),
      multi: true,
    },
  ],
})
export class LocationEntryComponent implements ControlValueAccessor, OnInit {
  public readonly autoCompleteOptions = {
    types: ['geocode'],
  };
  public usingCurrentLocation = false;

  private currentCoordinates: Subject<GeoCoordinates> = new Subject<
    GeoCoordinates
  >();
  private onChange?: any;
  private onTouch?: any;
  private touched = false;

  public readonly currentCoordinatesObservable: Observable<
    GeoCoordinates
  > = this.currentCoordinates.asObservable();

  @ViewChild(MatInput) locationInput: MatInput;

  constructor() {}

  ngOnInit(): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  updateAsTouchedIfNotAlreadyTouched() {
    if (!this.touched) {
      this.touched = true;
      this.onTouch?.();
    }
  }

  setDisabledState(isDisabled: boolean): void {
    throw new Error('Is disabled not implemented');
  }

  writeValue(obj: any): void {
    this.stopUsingCurrentLocationIfUsing();
    this.updateCurrentCoordinates(obj as GeoCoordinates);
  }

  useCurrentLocationHandler() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.currentGeoLocationSuccessCallback(position);
        this.updateAsTouchedIfNotAlreadyTouched();
      },
      () => {
        console.log('Failed to get user position');
        this.updateAsTouchedIfNotAlreadyTouched();
      }
    );
  }

  private currentGeoLocationSuccessCallback(position: Position) {
    this.updateCurrentCoordinates(position.coords);
    this.usingCurrentLocation = true;
    this.locationInput.placeholder = '';
    this.locationInput.value = '';
  }

  stopUsingCurrentLocationHandler() {
    this.stopUsingCurrentLocationIfUsing();
    this.updateCurrentCoordinates(null);
  }

  stopUsingCurrentLocationIfUsing() {
    this.usingCurrentLocation = false;
  }

  autocompleteChangeHandler($event?: GeoCoordinates) {
    this.updateCurrentCoordinates($event);
  }

  private updateCurrentCoordinates(geoCoordinates?: GeoCoordinates) {
    this.onChange?.(geoCoordinates);
    this.currentCoordinates.next(geoCoordinates);
  }
}
