import { Component, inject, signal } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavLat } from "./features/sidenav-lat/sidenav-lat";
import { SidenavContent } from "./features/sidenav-content/sidenav-content";
import { BreakpointScreen } from './core/services/breakpoint-screen';


@Component({
  selector: 'app-root',
  imports: [MatSidenavModule, SidenavLat, SidenavContent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('2o-progetto-angular-s2i');

  //importiamo il service dei breakpoints
  breakpoints = inject(BreakpointScreen)
}
