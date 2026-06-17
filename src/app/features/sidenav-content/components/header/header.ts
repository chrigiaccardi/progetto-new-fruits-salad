import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { MatInputModule } from "@angular/material/input";
import { FruitsStore } from '../../../../core/store/fruitsStore';

@Component({
  selector: 'app-header',
  imports: [MatInputModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // Iniettiamo MatDialog per poter usufruire dei suoi servizi
  matDialog = inject(MatDialog)
  fruitsStore = inject(FruitsStore)

  // Istanziaamo filtro ricerca per poterlo utilizzare
  readonly filtroRicerca = this.fruitsStore.filtroRicerca

  readonly erroreRicerca = signal(false)

}
