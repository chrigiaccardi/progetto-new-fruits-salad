import { Component, inject, signal } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavLat } from "./features/sidenav-lat/sidenav-lat";
import { SidenavContent } from "./features/sidenav-content/sidenav-content";
import { BreakpointScreen } from './core/services/breakpoint/breakpoint-screen';


@Component({
  selector: 'app-root',
  imports: [MatSidenavModule, SidenavLat, SidenavContent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  //importiamo il service dei breakpoints
  breakpoints = inject(BreakpointScreen)
}
