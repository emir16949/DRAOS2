import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuzikaComponent } from './muzika.component';

describe('MuzikaComponent', () => {
  let component: MuzikaComponent;
  let fixture: ComponentFixture<MuzikaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MuzikaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuzikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
