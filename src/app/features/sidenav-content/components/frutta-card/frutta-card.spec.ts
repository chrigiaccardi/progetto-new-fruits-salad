import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruttaCard } from './frutta-card';

describe('FruttaCard', () => {
  let component: FruttaCard;
  let fixture: ComponentFixture<FruttaCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FruttaCard],
    }).compileComponents();

    fixture = TestBed.createComponent(FruttaCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
