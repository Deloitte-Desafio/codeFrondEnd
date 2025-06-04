import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityPickerComponent } from './availability-picker.component';

describe('AvailabilityPickerComponent', () => {
  let component: AvailabilityPickerComponent;
  let fixture: ComponentFixture<AvailabilityPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailabilityPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailabilityPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
