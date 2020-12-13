import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit, OnChanges {
  stars: number[];

  // [0-5]
  @Input() rating: number;
  @Input() ratingCount: number;

  constructor() {}

  ngOnChanges(): void {
    this.stars = [...Array(5).keys()]
      .map((starIndex) => this.rating - starIndex)
      .map((fill) => {
        if (fill > 0.75) {
          return 1;
        }
        if (fill > 0.25) {
          return 0.5;
        }

        return 0;
      });
  }

  ngOnInit(): void {}
}
