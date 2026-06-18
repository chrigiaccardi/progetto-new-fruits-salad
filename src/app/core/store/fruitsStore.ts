import { httpResource } from '@angular/common/http';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { Frutto } from '../models/frutto';
import { computed, Signal, signal } from '@angular/core';

// Api per richiesta HTTP - Api cambiata per configurazione Proxy per politica Browser CORS
const apiFrutta:string = '/api/fruit'

export type FruitsState = {
    filtroRicerca: string;
    macedonia: Frutto[];
    famigliaSelezionata: string;
    genereSelezionato: string;
    ordineSelezionato: string;
}

export const FruitsStore = signalStore(
    { providedIn: 'root' },

    withState({
        filtroRicerca: '',
        macedonia: [],
        famigliaSelezionata: '',
        genereSelezionato: '',
        ordineSelezionato: '',
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

            // Creiamo tre metodo per gestire la Macedonia, aggiungi, rimuovi e svuota.
            aggiungiAMacedonia: (frutto: Frutto) => {
                // verifichiamo con some se il frutto è già presente o no
                const presenzaFrutto = store.macedonia().some(i => i.id === frutto.id)
                // Se si, some restituisce true
                if (presenzaFrutto) return
                // Se no crea un nuovo array con
                patchState(store, {macedonia: [...store.macedonia(), frutto]})
            },
            rimuoviDaMacedonia: (frutto: Frutto) => {
                patchState(store, {macedonia: store.macedonia().filter(f => f.id !== frutto.id)})
            },
            svuotaMacedonia: () => {
                patchState(store, {macedonia: [] })
            },

            // Creiamo un metodo per poter settare il filtroRicerca
            setFiltroRicerca: (testo: string) => {
                patchState(store, {filtroRicerca: testo})
            },

            // Creiamo il metodo per settare la famiglia, l'ordine e i genere del frutto
            setFamigliaSelezionata: (testo: string) => {
                patchState(store, {famigliaSelezionata: testo})
            },
            setOrdineSelezionato: (testo: string) => {
                patchState(store, {ordineSelezionato: testo})
            },
            setGenereSelezionato: (testo: string) => {
                patchState(store, {genereSelezionato: testo})
            },
            resetFiltri: () => {
                patchState(store, {
                    filtroRicerca: '',
                    famigliaSelezionata: '',
                    ordineSelezionato: '',
                    genereSelezionato: '',
                })
            }

        }
    }),

    withComputed((store) => ({
        // I nutrienti Totali li calcoliamo con un computed visto che vengono gestiti all'interno della macedonia
        // e ritorniamo il reduce tra accumulatore e il frutto in entrata partendo da 0
        totaliNutrienti: computed(() => {
            return store.macedonia().reduce(
                (acc, frutto) => ({
                    calorie: acc.calorie + frutto.nutritions.calories,
                    carboidrati: acc.carboidrati + frutto.nutritions.carbohydrates,
                    proteine: acc.proteine + frutto.nutritions.protein,
                    grassi: acc.grassi + frutto.nutritions.fat,
                    zuccheri: acc.zuccheri + frutto.nutritions.sugar,
                }),
                {calorie: 0, carboidrati: 0, proteine: 0, grassi: 0, zuccheri: 0,}
            )
        }),

        // Creiamo la lista frutti filtrata così da poterla filtrare con la barra di ricerca
        listaFruttiFiltrata: computed(() => {
            const testoRicerca = store.filtroRicerca().toLowerCase().trim();
            const famigliaSelect = store.famigliaSelezionata().toLowerCase().trim();
            const ordineSelect = store.ordineSelezionato().toLowerCase().trim();
            const genereSelect = store.genereSelezionato().toLowerCase().trim();

            if (!testoRicerca) return store.listaFrutta();

            return store.listaFrutta()?.filter(frutto => {
                const matchNome = frutto.name.toLowerCase().includes(testoRicerca);
                const matchFamiglia = frutto.family.toLowerCase() === famigliaSelect;
                const matchOrdine = frutto.order.toLowerCase() === ordineSelect;
                const matchGenere = frutto.genus.toLowerCase() === genereSelect;
            })
        }),

        // Creiamo i computed di famiglie, ordine e genere direttamente mappando quelli in ingresso con i frutti
        famiglieDisponibili: computed(() => [
            ...new Set(store.listaFrutta()?.map(f => f.family))
        ]),
        generiDisponibili: computed(() => [
            ...new Set(store.listaFrutta()?.map(f => f.genus))
        ]),
        ordiniDisponibili: computed(() => [
            ...new Set(store.listaFrutta()?.map(f => f.order))
        ]),

    }))

    
)