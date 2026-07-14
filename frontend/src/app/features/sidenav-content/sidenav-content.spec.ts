import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, Signal, WritableSignal } from '@angular/core';
import { SidenavContent } from './sidenav-content';
import { FruitsStore } from '../../core/store/fruitsStore';
import { Frutto } from '../../core/models/frutto';



describe('SidenavContent', () => {
  let component: SidenavContent;
  let fixture: ComponentFixture<SidenavContent>;
  // Istanziamo lo store, deve contenere tutti i metodi e valori utilizzati anche nei figli
  let fruitsStoreMock: {
    // Header Component
    setFiltroRicerca: ReturnType<typeof vi.fn>
    filtroRicerca: Signal<string>
    // Macedonia Card
    macedonia: Signal<Frutto[]>
    rimuoviDaMacedonia: ReturnType<typeof vi.fn>
    totaliNutrienti: Signal<object>
    // Lista Frutti Component
    caricamentoListaFrutta: WritableSignal<boolean>
    erroreListaFrutta: WritableSignal<Error | undefined>
    listaFruttiFiltrata: Signal<Frutto[]>
    listaFrutta: Signal<Frutto[]>
  }
  // Altra opzione si potrebbero utilizzare degli stub component, cioè mock dei componenti figli vuoti
  // così chè il mockStore sia snello e non debba contenere tutto quanto di tutti i componenti figli

  beforeEach(async () => {
    // Dichiariamo lo store
    fruitsStoreMock = {
      setFiltroRicerca: vi.fn(),
      filtroRicerca: signal(''),
      macedonia: signal([]),
      rimuoviDaMacedonia: vi.fn(),
      totaliNutrienti: signal({}),
      caricamentoListaFrutta: signal(false),
      erroreListaFrutta: signal(undefined),
      listaFruttiFiltrata: signal([]),
      listaFrutta: signal([])
    }

    await TestBed.configureTestingModule({
      imports: [ SidenavContent],
      providers: [
        { provide: FruitsStore, useValue: fruitsStoreMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
