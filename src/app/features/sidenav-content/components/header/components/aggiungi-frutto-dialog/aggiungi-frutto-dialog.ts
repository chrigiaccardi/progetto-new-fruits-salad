import { Component } from '@angular/core';
import { MatDialogTitle, MatDialogClose, MatDialogContent } from "../../../../../../../../node_modules/@angular/material/types/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-aggiungi-frutto-dialog',
  imports: [MatDialogTitle, MatButtonModule, MatDialogClose, MatIcon, MatDialogContent],
  templateUrl: './aggiungi-frutto-dialog.html',
  styleUrl: './aggiungi-frutto-dialog.css',
})
export class AggiungiFruttoDialog {}
