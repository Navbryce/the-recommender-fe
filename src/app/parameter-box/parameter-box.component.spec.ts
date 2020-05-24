import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterBoxComponent } from './parameter-box.component';

describe('ParameterBoxComponent', () => {
  let component: ParameterBoxComponent;
  let fixture: ComponentFixture<ParameterBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
