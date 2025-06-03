import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaOverviewComponent } from './agenda-overview.component';

describe('AgendaOverviewComponent', () => {
  let component: AgendaOverviewComponent;
  let fixture: ComponentFixture<AgendaOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
