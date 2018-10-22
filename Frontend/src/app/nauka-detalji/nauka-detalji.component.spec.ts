import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaukaDetaljiComponent } from './nauka-detalji.component';

describe('NaukaDetaljiComponent', () => {
  let component: NaukaDetaljiComponent;
  let fixture: ComponentFixture<NaukaDetaljiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NaukaDetaljiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaukaDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
