import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavLat } from './sidenav-lat';
import { FruitsStore } from '../../core/store/fruitsStore';
import { computed, signal, Signal } from '@angular/core';
import { Frutto } from '../../core/models/frutto';

describe('SidenavLat', () => {
  let component: SidenavLat;
  let fixture: ComponentFixture<SidenavLat>;
  // Istanziamo il fruitsStoreMock con i metodi e i valori che utilizziamo all'interno di questo componente
  let fruitsStoreMock: {
    listaFrutta: Signal<Frutto[]>

    famiglieDisponibili: Signal<string[]>
    generiDisponibili: Signal<string[]>
    ordiniDisponibili: Signal<string[]>
  }

  beforeEach(async () => {
    // Prima del configureTestingModule e della creazione del componente dichiariamo il mock con i valori iniziali
    fruitsStoreMock = {
      listaFrutta: signal([]),

      famiglieDisponibili: computed(() => [
            ...new Set(fruitsStoreMock.listaFrutta()?.map(f => f.family))
      ]),
      generiDisponibili: computed(() => [
            ...new Set(fruitsStoreMock.listaFrutta()?.map(f => f.genus))
      ]),
      ordiniDisponibili: computed(() => [
            ...new Set(fruitsStoreMock.listaFrutta()?.map(f => f.order))
        ]),
    }
    await TestBed.configureTestingModule({
      imports: [SidenavLat],
      providers: [{
        provide: FruitsStore, useValue: fruitsStoreMock
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavLat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
