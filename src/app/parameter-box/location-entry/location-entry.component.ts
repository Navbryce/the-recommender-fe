import { Component, OnInit, ViewChild } from '@angular/core';
import { GeoCoordinates } from '../../../data/GeoCoordinates.interface';
import { Observable, Subject } from 'rxjs';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-location-entry',
  templateUrl: './location-entry.component.html',
  styleUrls: ['./location-entry.component.scss'],
})
export class LocationEntryComponent implements OnInit {
  public usingCurrentLocation = false;

  private currentCoordinates: Subject<GeoCoordinates> = new Subject<
    GeoCoordinates
  >();
  private currentCoordinatesObservable: Observable<
    GeoCoordinates
  > = this.currentCoordinates.asObservable();

  @ViewChild(MatInput) locationInput: MatInput;
  constructor() {}

  ngOnInit(): void {}

  useCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.geoLocationSuccessCallback(position);
      },
      () => {
        console.log('Failed to get user position');
      }
    );
  }

  private geoLocationSuccessCallback(position: Position) {
    this.updateCurrentCoordinates(position.coords);
    this.usingCurrentLocation = true;
    this.locationInput.placeholder = '';
    this.locationInput.value = '';
  }

  stopUsingCurrentLocation() {
    this.usingCurrentLocation = false;
    this.updateCurrentCoordinates(null);
  }

  private updateCurrentCoordinates(geoCoordinates?: GeoCoordinates) {
    this.currentCoordinates.next(geoCoordinates);
  }
}
