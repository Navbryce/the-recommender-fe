import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
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
export class ImageCarouselComponent
  implements AfterViewInit, OnChanges, OnDestroy {
  private splide: any;
  readonly id: string;

  @Input() images: { url: string }[];
  @Input() height: string;

  constructor() {
    this.id = `slider-${uuidv4().toString().replace(/-/g, '')}`;
  }

  ngAfterViewInit(): void {
    this.createSplideAndAddImages(this.images);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.splide != null) {
      this.splide.destroy();
      document
        .querySelectorAll(`#${this.id} li`)
        .forEach((element) => element.remove());
      this.createSplideAndAddImages(this.images);
    }
  }

  private createSplideAndAddImages(images) {
    this.splide = new Splide(`#${this.id}`, {
      width: '100%',
      height: this.height,
      cover: true,
    });
    this.splide.mount();
    this.addImagesToSplide(this.splide, images);
  }

  private addImagesToSplide(splide, images) {
    images.forEach(({ url }) => {
      splide.add(`<li class="splide__slide"><img src='${url}'/></li>`);
    });
  }

  ngOnDestroy(): void {
    this.splide.destroy();
  }
}
