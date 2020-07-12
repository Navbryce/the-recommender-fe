import { Component, OnInit } from '@angular/core';
import { GeoCoordinates } from './data/models/GeoCoordinates.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
}
