import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loanproducts } from './loanproducts';

describe('Loanproducts', () => {
  let component: Loanproducts;
  let fixture: ComponentFixture<Loanproducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loanproducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Loanproducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
