import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLokacijaComponent } from './admin-lokacija.component';

describe('AdminLokacijaComponent', () => {
  let component: AdminLokacijaComponent;
  let fixture: ComponentFixture<AdminLokacijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLokacijaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLokacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
