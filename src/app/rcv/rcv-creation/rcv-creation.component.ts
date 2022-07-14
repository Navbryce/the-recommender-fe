import { Component, OnInit } from '@angular/core';
import { VIEW_CONFIG } from '../../view-config.const';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-rcv-creation',
  templateUrl: './rcv-creation.component.html',
  styleUrls: ['./rcv-creation.component.scss'],
})
export class RcvCreationComponent implements OnInit {
  public readonly VIEW_CONFIG = VIEW_CONFIG;

  public readonly rcvCreationFormGroup: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.rcvCreationFormGroup = this.formBuilder.group({
      location: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onFormSubmit(form: FormGroupDirective) {
    console.log(form);
  }
}
