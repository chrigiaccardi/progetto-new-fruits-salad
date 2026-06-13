import { Component, inject } from '@angular/core';
import { MacedoniaCard } from "./components/macedonia-card/macedonia-card";
import { Header } from "./components/header/header";
import { MatDivider } from "@angular/material/divider";
import { FruitsStore } from '../../core/store/fruitsStore';
import { FruttaCard } from "./components/frutta-card/frutta-card";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-sidenav-content',
  imports: [MacedoniaCard, Header, MatDivider, FruttaCard, MatProgressSpinnerModule],
  templateUrl: './sidenav-content.html',
  styleUrl: './sidenav-content.css',
})
export class SidenavContent {
    // Iniettiamo lo store per poterlo utilizzare
  fruitsStore = inject(FruitsStore)

  // Importiamo dallo store i seguenti valori
  readonly listaFrutta = this.fruitsStore.listaFrutta;
  readonly caricamentoListaFrutta = this.fruitsStore.caricamentoListaFrutta;
  readonly erroreListaFrutta = this.fruitsStore.erroreListaFrutta;
}
