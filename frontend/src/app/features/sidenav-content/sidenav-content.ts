import { Component, inject } from '@angular/core';
import { MacedoniaCard } from "./components/macedonia-card/macedonia-card";
import { Header } from "./components/header/header";
import { MatDivider } from "@angular/material/divider";
import { ListaFrutti } from "./components/lista-frutti/lista-frutti";


@Component({
  selector: 'app-sidenav-content',
  imports: [MacedoniaCard, Header, MatDivider, ListaFrutti],
  templateUrl: './sidenav-content.html',
  styleUrl: './sidenav-content.css',
})
export class SidenavContent {}
