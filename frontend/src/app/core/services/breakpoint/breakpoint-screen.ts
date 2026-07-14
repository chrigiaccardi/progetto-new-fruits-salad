import { computed, inject, Injectable, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { toSignal } from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root',
})
export class BreakpointScreen {
  // Creiamo un servizio per gestire i breakpoint del device per la reattività modile/desktop
  readonly breakpoint = inject(BreakpointObserver)
  // con toSignal trasformiamo l'observable in signal e requireSync obbliga immediatamente a trasmettere un valore che non sia undefined
  readonly statoDevice = toSignal(
    this.breakpoint.observe([Breakpoints.Small, Breakpoints.XSmall]), { requireSync: true}
  )
  // Rendiamo dinamici con i computed i valori:
  readonly aperturaManualeSidenav = signal(false)
  // metodo toggle per aprire e chiudere sidenav
  toggleSidenav() {
    this.aperturaManualeSidenav.update(v => !v)
  }
  // È un mobileDevice se matcha con lo stato device
  readonly isMobileDevice = computed(() => this.statoDevice().matches)
  // cambia la mode in base a se mobileDevice è true o false
  readonly sidenavMode = computed(() => this.isMobileDevice() ? 'over' : 'side')
  // apre o chiude la sidenav in base se il device è mobile o desktop
  readonly sidenavOpened = computed(() => this.isMobileDevice() ? this.aperturaManualeSidenav() : true)
}
