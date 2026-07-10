import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { Frutto } from '../../models/frutto';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiFruitsService {
  // Iniettiamo i vari servizi per poterli utilizzare
  private http = inject(HttpClient)
  private apiFrutta = environment.apiFrutta

  // Api per richiesta HTTP - Api cambiata per configurazione Proxy per politica Browser CORS


  readonly fruitsResource = httpResource<Frutto[]>(() => ({
    url: `${this.apiFrutta}/all`,
    method: 'GET'
  }))

  // Vogliamo che il service gestisca HTTP e invece lo store l'observable, quindi pipe ci permette di
  // fare qualcosa prima del subscribe, tap invece ci permette di fare operazioni collaterali senza consumare l'observable
  // In ingresso abbiamo il frutto invece in uscita abbiamo la stringa di successo
  aggiungiFrutto(nuovoFrutto: Omit<Frutto, 'id'>) {
    return this.http.put<{ success: string }>(this.apiFrutta, nuovoFrutto).pipe(
        tap(() => this.fruitsResource.reload())
    )}

  ricaricareListaFrutti() {
    this.fruitsResource.reload()
  }

  // Effettuamo una chiamata API per la ricerca del singolo frutto tramite barra di ricerca
  ricercaFrutto(nomeFrutto: string) {
    return this.http.get<Frutto>(`${this.apiFrutta}/${nomeFrutto}`)
  }
}
