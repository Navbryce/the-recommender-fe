import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

declare var Splide: any;

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
})
export class ImageCarouselComponent implements AfterViewInit {
  readonly id: string;

  @Input() images: { url: string }[];
  @Input() height: string;

  constructor() {
    this.id = `slider-${uuidv4().toString().replace(/-/g, '')}`;
    console.log(this.id);
  }

  ngAfterViewInit(): void {
    new Splide(`#${this.id}`, {
      width: '100%',
      height: this.height,
      cover: true,
    }).mount();
  }
}
