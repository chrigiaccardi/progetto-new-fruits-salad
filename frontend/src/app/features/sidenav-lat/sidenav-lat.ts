import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { FruitsStore } from '../../core/store/fruitsStore';
import { MatAnchor } from "@angular/material/button";
import { BreakpointScreen } from '../../core/services/breakpoint/breakpoint-screen';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidenav-lat',
  imports: [MatDividerModule, MatAnchor, MatIconModule, MatButtonModule],
  templateUrl: './sidenav-lat.html',
  styleUrl: './sidenav-lat.css',
})
export class SidenavLat {
  // Iniettiamo lo store per poterlo utilizzare
  fruitsStore = inject(FruitsStore)
  breakpoints = inject(BreakpointScreen)
  // Istanziamo i vari valori dello store
  readonly famiglieDisponibili = this.fruitsStore.famiglieDisponibili
  readonly ordiniDisponibili = this.fruitsStore.ordiniDisponibili
  readonly generiDisponibili = this.fruitsStore.generiDisponibili

  // Per ovviare al problema di tipizzazione di TypeSCript: Dobbiamo confermare che sia un elemento select per poter accedere al valore dell'evento
  onFamigliaCambia(event: Event): void {
    const valore = (event.target as HTMLSelectElement).value;
    this.fruitsStore.setFamigliaSelezionata(valore)
  }
  onOrdineCambia(event: Event): void {
    const valore = (event.target as HTMLSelectElement).value;
    this.fruitsStore.setOrdineSelezionato(valore)
  }
  onGenereCambia(event: Event): void {
    const valore = (event.target as HTMLSelectElement).value;
    this.fruitsStore.setGenereSelezionato(valore)
  }

}
