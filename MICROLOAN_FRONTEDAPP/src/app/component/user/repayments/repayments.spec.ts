import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Repayments } from './repayments';

describe('Repayments', () => {
  let component: Repayments;
  let fixture: ComponentFixture<Repayments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Repayments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Repayments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
