import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KulturaDetaljiComponent } from './kultura-detalji.component';

describe('KulturaDetaljiComponent', () => {
  let component: KulturaDetaljiComponent;
  let fixture: ComponentFixture<KulturaDetaljiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KulturaDetaljiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KulturaDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
