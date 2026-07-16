import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { Frutto, NuovoFrutto } from '../../models/frutto';
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
  // In fase di sviluppo abbiamo utilizzato le api dirette al sito Fruityvice con proxy x CORS.
  // Abbiamo fatto delle modifiche creando un BFF (Backend For Frontend) per fare da intermediario
  // quando deployamo su firebase l'applicazione.
  // Di conseguenza gli url delle chiamate vengono modificati perché il Frontend non chiama più direttamente
  // il sito ma il backend creato da noi che a catena si occuperà lui di chiamare il sito Fuityvice
  // e ricevere i dati


  readonly fruitsResource = httpResource<Frutto[]>(() => ({
    // Vecchio URL: `${this.apiFrutta}/all`
    url: this.apiFrutta,
    method: 'GET'
  }))

  // Vogliamo che il service gestisca HTTP e invece lo store l'observable, quindi pipe ci permette di
  // fare qualcosa prima del subscribe, tap invece ci permette di fare operazioni collaterali senza consumare l'observable
  // In ingresso abbiamo il frutto invece in uscita abbiamo la stringa di successo
  aggiungiFrutto(nuovoFrutto: NuovoFrutto) {
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
