import { httpResource } from '@angular/common/http';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'
import { Frutta } from '../models/frutta';

// Api per richiesta HTTP
const apiFrutta:string = 'https://api/fruits'

export type FruitsState = {
    filtroRicerca: string;
}

export const FruitsStore = signalStore(
    { providedIn: 'root' },

    withState({
        filtroRicerca: '',
    } as FruitsState),

    withMethods((store) => {
        const rispostaFrutta = httpResource<Frutta[]>(() => ({
            url: `${apiFrutta}/all`,
            method: 'GET'
        }))
        
        return {
            listaFrutti: rispostaFrutta.value,
            caricamentoListaFrutti: rispostaFrutta.isLoading,
            erroreListaFrutti: rispostaFrutta.error,

            ricaricareListaFrutti: () => {
                rispostaFrutta.reload()
            },
        }
    })

    
)