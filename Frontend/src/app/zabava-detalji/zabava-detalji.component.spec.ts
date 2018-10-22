import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZabavaDetaljiComponent } from './zabava-detalji.component';

describe('ZabavaDetaljiComponent', () => {
  let component: ZabavaDetaljiComponent;
  let fixture: ComponentFixture<ZabavaDetaljiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ZabavaDetaljiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZabavaDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
