import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFrutti } from './lista-frutti';
import { FruitsStore } from '../../../../core/store/fruitsStore';

describe('ListaFrutti', () => {
  let component: ListaFrutti;
  let fixture: ComponentFixture<ListaFrutti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFrutti],
      providers: [FruitsStore]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaFrutti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
