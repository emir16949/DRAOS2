import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKategorijeComponent } from './admin-kategorije.component';

describe('AdminKategorijeComponent', () => {
  let component: AdminKategorijeComponent;
  let fixture: ComponentFixture<AdminKategorijeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminKategorijeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKategorijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
