import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUseriComponent } from './admin-useri.component';

describe('AdminUseriComponent', () => {
  let component: AdminUseriComponent;
  let fixture: ComponentFixture<AdminUseriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUseriComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUseriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
