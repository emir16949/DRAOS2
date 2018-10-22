import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KulturaComponent } from './kultura.component';

describe('KulturaComponent', () => {
  let component: KulturaComponent;
  let fixture: ComponentFixture<KulturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KulturaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KulturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
