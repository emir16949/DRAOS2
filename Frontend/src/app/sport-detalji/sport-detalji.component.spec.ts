import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportDetaljiComponent } from './sport-detalji.component';

describe('SportDetaljiComponent', () => {
  let component: SportDetaljiComponent;
  let fixture: ComponentFixture<SportDetaljiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SportDetaljiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
