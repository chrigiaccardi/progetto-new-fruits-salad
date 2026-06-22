import { Component, inject } from '@angular/core';
import { MatDialogTitle, MatDialogClose, MatDialogContent } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { NonNullableFormBuilder } from '@angular/forms';
import { FruitsStore } from '../../../../../../core/store/fruitsStore';
import { MatFormField, MatInputModule } from "@angular/material/input";
import {MatSelectModule} from '@angular/material/select'

@Component({
  selector: 'app-aggiungi-frutto-dialog',
  imports: [MatDialogTitle, MatButtonModule, MatDialogClose, MatSelectModule, MatIcon, MatDialogContent, MatFormField, MatInputModule],
  templateUrl: './aggiungi-frutto-dialog.html',
  styleUrl: './aggiungi-frutto-dialog.css',
})
export class AggiungiFruttoDialog {
  // Iniettiamo NonNullableFormBuilder per non dichiarare in continuazione
  // che i valori protrebbero essere null e automaticamente resettare i campi
  formBuilder = inject(NonNullableFormBuilder);
  // Iniettiamo lo store per poterlo utilizare
  fruitsStore = inject(FruitsStore)

  // Istanziamo i valori dello store
  readonly famiglieDisponibili = this.fruitsStore.famiglieDisponibili
  readonly ordiniDisponibili = this.fruitsStore.ordiniDisponibili
  readonly generiDisponibili = this.fruitsStore.generiDisponibili

  // Dichiariamo che il form ha determinati campi,
  // I Validatori si accertano che siano validi e required che  sono obbligatori
  aggiungiFruttoForm = this.formBuilder.group({

  })
}
