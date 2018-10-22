import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZabavaComponent } from './zabava.component';

describe('ZabavaComponent', () => {
  let component: ZabavaComponent;
  let fixture: ComponentFixture<ZabavaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ZabavaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZabavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
