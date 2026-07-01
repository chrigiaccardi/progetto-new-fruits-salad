import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { FruitsStore } from '../../../../core/store/fruitsStore';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [{
        provide: FruitsStore
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


// Esempio da utenti store
// Creiamo i mock dei store e metodi che utilizziamo
    // utentiStoreMock = {
    //   utenti: signal([]),
    //   caricamento: signal(false),
    //   errore: signal(undefined),
    //   paginaCorrente: signal(2),
    //   itemXPagina: signal(5),
    //   paginaSuccessiva: computed(() => utentiStoreMock.paginaCorrente() + 1),
    //   paginaPrecedente: computed(() => utentiStoreMock.paginaCorrente() - 1),
    //   opzioniItemPagina: signal([]),

    //   itemPerPagina: vi.fn()
    // }
    // erroreRicerca = signal(false)

    // await TestBed.configureTestingModule({
    //   imports: [ListaUtenti],
    //   providers: [
    //     { provide: UtentiStore, useValue: utentiStoreMock },
    //     provideRouter([])
    //   ]
    // }).compileComponents();
