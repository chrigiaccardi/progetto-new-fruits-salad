import { Component, inject, input, signal } from '@angular/core';
import { Frutto } from '../../../../core/models/frutto';
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from '@angular/material/icon';
import { FruitsStore } from '../../../../core/store/fruitsStore';

@Component({
  selector: 'app-frutta-card',
  imports: [MatDividerModule, MatButtonModule, MatIconModule],
  templateUrl: './frutta-card.html',
  styleUrl: './frutta-card.css',
})
export class FruttaCard {
  // importiamo in input i dati con il binding
  frutto = input.required<Frutto>()

  // Importiamo lo store per poterlo utilizzare
  fruitsStore = inject(FruitsStore)

  // Bottone Apri elenco valori nutrizionali
  valNut = signal(false);
  // Metodo toggle per aprire l'elenco dei valori nutrizionali
  toggleValNut() {
  this.valNut.update(v => !v);
}
}
