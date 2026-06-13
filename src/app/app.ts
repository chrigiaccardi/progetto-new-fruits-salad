import { Component, signal } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavLat } from "./features/sidenav-lat/sidenav-lat";
import { SidenavContent } from "./features/sidenav-content/sidenav-content";


@Component({
  selector: 'app-root',
  imports: [MatSidenavModule, SidenavLat, SidenavContent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('2o-progetto-angular-s2i');
}
