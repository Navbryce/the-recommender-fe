import { Component, Input, OnChanges } from '@angular/core';
import { GeoCoordinates } from '../data/models/GeoCoordinates.interface';

@Component({
  selector: 'app-recommendation-engine',
  templateUrl: './recommendation-engine.component.html',
  styleUrls: ['./recommendation-engine.component.scss'],
})
export class RecommendationEngineComponent implements OnChanges {
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
