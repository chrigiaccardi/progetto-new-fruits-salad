import { Component, inject } from '@angular/core';
import { FruitsStore } from '../../../../core/store/fruitsStore';
import {MatChipsModule} from '@angular/material/chips';
import { MatIcon } from "@angular/material/icon";
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-macedonia-card',
  imports: [MatChipsModule, MatIcon, DecimalPipe],
  templateUrl: './macedonia-card.html',
  styleUrl: './macedonia-card.css',
})
export class MacedoniaCard {
  // Iniettiamo lo store per poterlo utilizzare
  fruitsStore = inject(FruitsStore)
}
