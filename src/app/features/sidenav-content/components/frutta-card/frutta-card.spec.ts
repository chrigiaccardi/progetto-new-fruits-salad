import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruttaCard } from './frutta-card';
import { Frutto } from '../../../../core/models/frutto';
import { FruitsStore } from '../../../../core/store/fruitsStore';

describe('FruttaCard', () => {
  let component: FruttaCard;
  let fixture: ComponentFixture<FruttaCard>;
  // Istanziamo lo store
  let fruitsStoreMock:{}
  // Istanziamo un fruttoMock in entrata binding
  const fruttoMock: Frutto = {
    id: 1,
    name: 'Apple',
    family: 'Rosaceae',
    genus: 'Malus',
    order: 'Rosales',
    nutritions: {
    carbohydrates: 14,
    protein: 0.3,
    fat: 0.2,
    calories: 52,
    sugar: 10
    }
  }

  beforeEach(async () => {
    // Dichiariamo lo store
    fruitsStoreMock = {}

    await TestBed.configureTestingModule({
      imports: [FruttaCard],
      providers: [{
        provide: FruitsStore, useValue: fruitsStoreMock
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(FruttaCard);
    component = fixture.componentInstance;
    // Con setInput settiamo che il frutto in input binding è il fruttoMock
    fixture.componentRef.setInput('frutto',fruttoMock)
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
