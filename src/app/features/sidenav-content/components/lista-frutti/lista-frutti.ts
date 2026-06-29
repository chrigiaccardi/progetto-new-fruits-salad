import { Component, inject } from '@angular/core';
import { FruitsStore } from '../../../../core/store/fruitsStore';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FruttaCard } from '../frutta-card/frutta-card';

@Component({
  selector: 'app-lista-frutti',
  imports: [MatProgressSpinnerModule, FruttaCard],
  templateUrl: './lista-frutti.html',
  styleUrl: './lista-frutti.css',
})
export class ListaFrutti {
      // Iniettiamo lo store per poterlo utilizzare
  fruitsStore = inject(FruitsStore)

  // Importiamo dallo store i seguenti valori
  readonly caricamentoListaFrutta = this.fruitsStore.caricamentoListaFrutta;
  readonly erroreListaFrutta = this.fruitsStore.erroreListaFrutta;
  readonly listaFruttiFiltrata = this.fruitsStore.listaFruttiFiltrata
  readonly listaFrutta = this.fruitsStore.listaFrutta()
}
