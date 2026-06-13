import { httpResource } from '@angular/common/http';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'
import { Frutto } from '../models/frutto';
import { Signal, signal } from '@angular/core';

// Api per richiesta HTTP - Api cambiata per configurazione Proxy per politica Browser CORS
const apiFrutta:string = '/api/fruit'

export type FruitsState = {
    filtroRicerca: string;
}

export const FruitsStore = signalStore(
    { providedIn: 'root' },

    withState({
        filtroRicerca: '',
    } as FruitsState),

    withMethods((store) => {
        const rispostaFrutta = httpResource<Frutto[]>(() => ({
            url: `${apiFrutta}/all`,
            method: 'GET'
        }))
        
        return {
            listaFrutta: rispostaFrutta.value,
            caricamentoListaFrutta: rispostaFrutta.isLoading,
            erroreListaFrutta: rispostaFrutta.error,

            ricaricareListaFrutti: () => {
                rispostaFrutta.reload()
            },

        }
    })

    
)