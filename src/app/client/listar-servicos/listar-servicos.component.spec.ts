import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarServicosComponent } from './listar-servicos.component';

describe('ListarServicosComponent', () => {
  let component: ListarServicosComponent;
  let fixture: ComponentFixture<ListarServicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarServicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
