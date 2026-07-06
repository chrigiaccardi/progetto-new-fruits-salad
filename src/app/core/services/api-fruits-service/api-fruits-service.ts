import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, resource } from '@angular/core';
import { signalMethod, patchState } from '@ngrx/signals';
import { Frutto } from '../../models/frutto';

@Injectable({
  providedIn: 'root',
})
export class ApiFruitsService {
  // Iniettiamo i vari servizi per poterli utilizzare
  private http = inject(HttpClient)

  // Api per richiesta HTTP - Api cambiata per configurazione Proxy per politica Browser CORS
  private apiFrutta:string = '/api/fruit'

  readonly fruitsResource = httpResource<Frutto[]>(() => ({
    url: `${this.apiFrutta}/all`,
    method: 'GET'
  }))

  readonly aggiungiFrutto = signalMethod<Omit<Frutto, 'id'>>((nuovoFrutto) => {
      this.http.put<{success: string}> (this.apiFrutta, nuovoFrutto).subscribe({
          next: (resource) => {
              this.fruitsResource.reload();
          },
          error: (err) => {
              patchState(store, { erroreAggiuntaFrutto: `Errore nell'aggiunta del nuovo Frutto: ${err.statusText}` })
              toaster.error(`Errore nell'aggiunta del frutto: ${err.statusText}`)
          }
      })
  })

  ricaricareListaFrutti() {
    this.fruitsResource.reload()
  }
}
