import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuzikaDetaljiComponent } from './muzika-detalji.component';

describe('MuzikaDetaljiComponent', () => {
  let component: MuzikaDetaljiComponent;
  let fixture: ComponentFixture<MuzikaDetaljiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MuzikaDetaljiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuzikaDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
