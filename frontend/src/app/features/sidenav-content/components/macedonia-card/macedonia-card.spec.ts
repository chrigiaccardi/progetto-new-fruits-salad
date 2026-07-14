import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MacedoniaCard } from './macedonia-card';
import { FruitsStore } from '../../../../core/store/fruitsStore';
import { Frutto } from '../../../../core/models/frutto';
import { Signal, signal } from '@angular/core';

describe('MacedoniaCard', () => {
  let component: MacedoniaCard;
  let fixture: ComponentFixture<MacedoniaCard>;
  // Istanziamo i mock dello store e i metodi che utilizziamo
  let fruitsStoreMock: {
    macedonia: Signal<Frutto[]>
    rimuoviDaMacedonia: ReturnType<typeof vi.fn>
    totaliNutrienti: Signal<object>
  }

  beforeEach(async () => {
    // Dichiariamo i mock dello store e i metodi che utilizziamo dandogli dei valori di partenza
    fruitsStoreMock = {
      macedonia: signal([]),
      rimuoviDaMacedonia: vi.fn(),
      totaliNutrienti: signal({})
    }
    await TestBed.configureTestingModule({
      imports: [MacedoniaCard],
       providers: [{
        provide: FruitsStore, useValue: fruitsStoreMock
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(MacedoniaCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
