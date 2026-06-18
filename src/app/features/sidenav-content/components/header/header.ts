import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { MatInputModule } from "@angular/material/input";
import { FruitsStore } from '../../../../core/store/fruitsStore';
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { AggiungiFruttoDialog } from './components/aggiungi-frutto-dialog/aggiungi-frutto-dialog';

@Component({
  selector: 'app-header',
  imports: [MatInputModule, MatAnchor, MatIcon],
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

  // Metodo per aprire il dialog
  apriDialogAggiungiFrutto() {
    this.matDialog.open(AggiungiFruttoDialog)
  }
}
