import { Component, effect, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { MatInputModule } from "@angular/material/input";
import { FruitsStore } from '../../../../core/store/fruitsStore';
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { AggiungiFruttoDialog } from './components/aggiungi-frutto-dialog/aggiungi-frutto-dialog';
import { BreakpointScreen } from '../../../../core/services/breakpoint/breakpoint-screen';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [MatInputModule, MatIcon, ReactiveFormsModule, MatButtonModule],
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

  // Selezioniamo il form per la barra di ricerca
  barraDiRicercaFrutto = new FormControl<string>('', {
    nonNullable: true, // Possono esserci valori null e si resettano in automatico (nonNullableFormBuilder)
    validators: [Validators.minLength(2)] // la ricerca è valida solamente dopo i primi 2 caratteri - gestione performance
  })

  // Nel costruttore il valueChanges controlla il cambio valore della barra di ricerca con un debounce di 500 ms
  // dopo di chè manda la richiesta per il filtraggio degli utenti
  constructor() {
    this.barraDiRicercaFrutto.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntilDestroyed()
    ).subscribe(valore => {
      const testo = valore.trim()
      if (this.barraDiRicercaFrutto.valid || testo === '') {
        this.erroreRicerca.set(false)
        this.fruitsStore.setFiltroRicerca(testo)
      } else {
        this.erroreRicerca.set(true)
      }
    });

    // Nel costruttore impostiamo l'effect per far si che ascolti filtro ricerca,
    effect(() => {
      const filtro = this.filtroRicerca()

      if (this.barraDiRicercaFrutto.value !== filtro) {
        this.barraDiRicercaFrutto.setValue(filtro, {emitEvent: false})
      }
    })
  }
}
