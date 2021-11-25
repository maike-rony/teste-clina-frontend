import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveDateComponent } from './reserve-date.component';

describe('ReserveDateComponent', () => {
  let component: ReserveDateComponent;
  let fixture: ComponentFixture<ReserveDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
