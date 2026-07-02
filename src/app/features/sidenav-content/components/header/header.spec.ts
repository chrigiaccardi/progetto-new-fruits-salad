import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { FruitsStore } from '../../../../core/store/fruitsStore';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  // Istanziamo lo store con i metodi che utilizziamo
  let fruitsStoreMock: {
    setFiltroRicerca: ReturnType<typeof vi.fn>
  }

  beforeEach(async () => {
    // Prima del configureTestingModule dichiariamo i mock dello store e i metodi che utilizziamo, dandogli un valore di partenza
    fruitsStoreMock = {
      setFiltroRicerca: vi.fn()
    }

    await TestBed.configureTestingModule({
      imports: [Header],
      // Nei providers indichiamo che il provide FruitsStore viene sostituito con il mock
      providers: [{
        provide: FruitsStore, useValue: fruitsStoreMock
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

