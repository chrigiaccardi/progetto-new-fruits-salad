import { Component } from '@angular/core';
import { MacedoniaCard } from "./components/macedonia-card/macedonia-card";
import { Header } from "./components/header/header";
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-sidenav-content',
  imports: [MacedoniaCard, Header, MatDivider],
  templateUrl: './sidenav-content.html',
  styleUrl: './sidenav-content.css',
})
export class SidenavContent {}
