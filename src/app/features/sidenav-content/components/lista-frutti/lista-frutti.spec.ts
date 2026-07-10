import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFrutti } from './lista-frutti';
import { FruitsStore } from '../../../../core/store/fruitsStore';
import { signal, Signal, WritableSignal } from '@angular/core';
import { Frutto } from '../../../../core/models/frutto';

describe('ListaFrutti', () => {
  let component: ListaFrutti;
  let fixture: ComponentFixture<ListaFrutti>;
  // Istanziamo il fruitsStore e i metodi utilizzati nel componente
  let fruitsStoreMock: {
    caricamentoListaFrutta: WritableSignal<boolean>
    erroreListaFrutta: WritableSignal<Error | undefined>
    listaFruttiFiltrata: Signal<Frutto[]>
    listaFrutta: Signal<Frutto[]>
    filtroRicerca: Signal<string>
  }

  beforeEach(async () => {
    // Dichiariamo il fruitsStore e i valori di default di cosa utilizziamo
    fruitsStoreMock = {
      caricamentoListaFrutta: signal(false),
      erroreListaFrutta: signal(undefined),
      listaFruttiFiltrata: signal([]),
      listaFrutta: signal([]),
      filtroRicerca: signal('')
    }

    await TestBed.configureTestingModule({
      imports: [ListaFrutti],
      providers: [{
        provide: FruitsStore, useValue: fruitsStoreMock
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaFrutti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
