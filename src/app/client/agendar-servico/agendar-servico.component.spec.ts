import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarServicoComponent } from './agendar-servico.component';

describe('AgendarServicoComponent', () => {
  let component: AgendarServicoComponent;
  let fixture: ComponentFixture<AgendarServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendarServicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendarServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
