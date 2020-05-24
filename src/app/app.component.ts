import {Component, OnInit} from '@angular/core';
import {GeoCoordinates} from '../data/GeoCoordinates.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userCoordinates: GeoCoordinates;

  ngOnInit(): void {
   navigator.geolocation.getCurrentPosition((position) => this.geolocationSuccessCallback(position),
     () => { console.log('Failed to get user position'); });
  }

  private geolocationSuccessCallback(newPosition: Position) {
    this.updateUserCoordinates(newPosition.coords);
  }

  private updateUserCoordinates(newCoords: GeoCoordinates) {
    this.userCoordinates = newCoords;
  }
}
