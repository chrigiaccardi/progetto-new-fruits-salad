import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruttaCard } from './frutta-card';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FruitsStore } from '../../../../core/store/fruitsStore';

describe('FruttaCard', () => {
  let component: FruttaCard;
  let fixture: ComponentFixture<FruttaCard>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FruttaCard],
      providers: [FruitsStore]
    }).compileComponents();

    fixture = TestBed.createComponent(FruttaCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
