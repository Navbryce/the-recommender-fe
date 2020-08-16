import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boolean-icon',
  templateUrl: './boolean-indicator-icon.component.html',
  styleUrls: ['./boolean-indicator-icon.component.scss'],
})
export class BooleanIndicatorIconComponent implements OnInit {
  @Input() value: boolean;

  constructor() {}

  ngOnInit(): void {}
}
