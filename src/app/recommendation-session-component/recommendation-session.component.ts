import { Component, Input, OnChanges } from '@angular/core';
import { GeoCoordinates } from '../data/models/GeoCoordinates.interface';

@Component({
  selector: 'app-recommendation-session',
  templateUrl: './recommendation-session.compnent.html',
  styleUrls: ['./recommendation-session.component.scss'],
})
export class RecommendationSessionComponent implements OnChanges {
  currentCoordinates: GeoCoordinates;

  @Input() geoCoordinates: GeoCoordinates;

  ngOnChanges(): void {
    if (this.geoCoordinates != null) {
      this.userCoordinatesUpdated(this.geoCoordinates);
    }
  }

  userCoordinatesUpdated(newCoordinates: GeoCoordinates) {
    this.currentCoordinates = newCoordinates;
  }
}
