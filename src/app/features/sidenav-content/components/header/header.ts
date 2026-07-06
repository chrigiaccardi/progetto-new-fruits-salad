import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { MatInputModule } from "@angular/material/input";
import { FruitsStore } from '../../../../core/store/fruitsStore';
import { MatAnchor, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { AggiungiFruttoDialog } from './components/aggiungi-frutto-dialog/aggiungi-frutto-dialog';
import { BreakpointScreen } from '../../../../core/services/breakpoint/breakpoint-screen';

@Component({
  selector: 'app-header',
  imports: [MatInputModule, MatAnchor, MatIcon, MatIconButton],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // Iniettiamo per poter usufruire dei suoi servizi
  matDialog = inject(MatDialog)
  fruitsStore = inject(FruitsStore)
  breakpoints = inject(BreakpointScreen)


  // Istanziaamo filtro ricerca per poterlo utilizzare
  readonly filtroRicerca = this.fruitsStore.filtroRicerca

  // Istanziamo erroreRicerca per poterlo utilizzare 
  readonly erroreRicerca = signal(false)

  // Metodo per aprire il dialog
  apriDialogAggiungiFrutto() {
    this.matDialog.open(AggiungiFruttoDialog)
  }

  // Metodo per cambiare il toggle per la sidenav preso dal service Breakpoints
  sidenanToggle() {
    this.breakpoints.sidenavOpened()
  }
}
