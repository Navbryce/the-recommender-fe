import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  animations: [
    trigger('loadingPhrasesAnimation', [
      transition('false=>true', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition('true=>false', [animate('500ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class SpinnerComponent implements OnInit, AfterViewInit {
  @Input() loadingPhrases: string[] = [];
  @Input() loadingPhraseDurationMs = 5000;

  currentWordIdx = 0;
  loadingPhraseVisible = false;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadingPhraseVisible = true;
    }, 0);
  }

  onAnimationComplete(event) {
    if (this.loadingPhraseVisible) {
      setTimeout(() => {
        this.loadingPhraseVisible = false;
      }, this.loadingPhraseDurationMs);
    } else {
      this.currentWordIdx =
        (this.currentWordIdx + 1) % this.loadingPhrases.length;
      this.loadingPhraseVisible = true;
    }
  }
}
