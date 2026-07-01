import { Component, inject } from '@angular/core';
import { MatDialogTitle, MatDialogClose, MatDialogContent,} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { FruitsStore } from '../../../../../../core/store/fruitsStore';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select'
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-aggiungi-frutto-dialog',
  imports: [MatDialogTitle, MatButtonModule, MatDialogClose, MatSelectModule, MatIcon, MatDialogContent, MatInputModule, ReactiveFormsModule],
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
    name: this.formBuilder.control<string>('', [Validators.required]),
    family: this.formBuilder.control<string>('', [Validators.required]),
    genus: this.formBuilder.control<string>('', [Validators.required]),
    order: this.formBuilder.control<string>('', [Validators.required]),
    // Essendo che nutritions è un sottogruppo dobbiamo impostare un nuovo formGroup con i relativi valori nutrizionali
    nutritions: this.formBuilder.group({
      carbohydrates: this.formBuilder.control<number | null>(null, [Validators.required]),
      protein: this.formBuilder.control<number | null>(null, [Validators.required]),
      fat: this.formBuilder.control<number | null>(null, [Validators.required]),
      calories: this.formBuilder.control<number | null>(null, [Validators.required]),
      sugar: this.formBuilder.control<number | null>(null, [Validators.required]),
    })
  })
  // Creiamo il metodo per poter aggiungere il nuovo frutto richiamando quello dello store
  aggiungiNuovoFrutto() {
    this.fruitsStore.aggiungiFrutto(this.aggiungiFruttoForm.getRawValue())
  }
}
