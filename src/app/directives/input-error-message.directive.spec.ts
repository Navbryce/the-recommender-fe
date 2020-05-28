import { InputErrorMessageDirective } from './input-error-message.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestComponent } from '../test-resources/test.component';

describe('InputErrorMessageDirective', () => {
  let TEST_COMPONENT_FIXTURE: ComponentFixture<TestComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
    });
    TEST_COMPONENT_FIXTURE = TestBed.createComponent(TestComponent);
  });
  it('should create an instance', () => {
    const directive = new InputErrorMessageDirective(
      TEST_COMPONENT_FIXTURE.elementRef
    );
    expect(directive).toBeTruthy();
  });
});
