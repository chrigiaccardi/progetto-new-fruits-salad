import { HttpClient, httpResource } from '@angular/common/http';
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { Frutto} from '../models/frutto';
import { computed, inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';


// Api per richiesta HTTP - Api cambiata per configurazione Proxy per politica Browser CORS
 const apiFrutta:string = '/api/fruit'

export type FruitsState = {
    filtroRicerca: string;
    macedonia: Frutto[];
    famigliaSelezionata: string;
    genereSelezionato: string;
    ordineSelezionato: string;
    erroreAggiuntaFrutto: string;
}

export const FruitsStore = signalStore(
    { providedIn: 'root' },

    withState({
        filtroRicerca: '',
        macedonia: [],
        famigliaSelezionata: '',
        genereSelezionato: '',
        ordineSelezionato: '',
        erroreAggiuntaFrutto: '',
    } as FruitsState),

    withMethods((store, http = inject(HttpClient), toaster = inject(HotToastService)) => {
        // Risposta dal backend per l lista frutti completa
        // Utilizziamo HttpResource per avere in risposta anche caricamento ed errori
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

            // Creiamo il metodo per poter aggiungere un nuovo frutto al backend
            // Dietro signalMethod abbiamo il tipo di dati che inviamo invece dietro PUT il tipo di dati che riceviamo
            // In questo caso string perchè riceviamo un messaggio dal backend di successo
            aggiungiFrutto: signalMethod<Omit<Frutto, 'id'>>((nuovoFrutto) => {
                http.put<{success: string}> (apiFrutta, nuovoFrutto).subscribe({
                    next: (risposta) => {
                        rispostaFrutta.reload();
                        toaster.success(risposta.success)

                    },
                    error: (err) => {
                        patchState(store, { erroreAggiuntaFrutto: `Errore nell'aggiunta del nuovo Frutto: ${err.statusText}` })
                        toaster.error(`Errore nell'aggiunta del frutto: ${err.statusText}`)
                    }
                })
            }),

            // Creiamo tre metodi per gestire la Macedonia, aggiungi, rimuovi e svuota.
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

            // Creiamo un metodo per resettare i filtri
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
                    // Utilizziamo ?? 0 perchè reduce vuole sempre un number, quindi visto che il valore potrebbe essere null,
                    // impostiamo che se è null venga inserito 0
                    calorie: acc.calorie + (frutto.nutritions.calories ?? 0),
                    carboidrati: acc.carboidrati + (frutto.nutritions.carbohydrates ?? 0),
                    proteine: acc.proteine + (frutto.nutritions.protein ?? 0),
                    grassi: acc.grassi + (frutto.nutritions.fat  ?? 0),
                    zuccheri: acc.zuccheri + (frutto.nutritions.sugar ?? 0)
                }),
                {calorie: 0, carboidrati: 0, proteine: 0, grassi: 0, zuccheri: 0,}
            )
        }),

        // Creiamo la lista frutti filtrata così da poterla filtrare con la barra di ricerca
        listaFruttiFiltrata: computed(() => {
            // Eseguiamo la lettura dei risultati dei filtri
            const testoRicerca = store.filtroRicerca().toLowerCase().trim();
            const famigliaSelect = store.famigliaSelezionata().toLowerCase().trim();
            const ordineSelect = store.ordineSelezionato().toLowerCase().trim();
            const genereSelect = store.genereSelezionato().toLowerCase().trim();

            // Se tutti i filtri sono azzerati allora restituisci la listaFrutta completa come da lettura backend
            if (!testoRicerca && !famigliaSelect && !ordineSelect && !genereSelect) return store.listaFrutta();

            // Eseguiamo un filtraggio della listaFrutta, la callback frutto restituisce, per ogni frutto, true se deve essere tenuto e false se scartato
            return store.listaFrutta()?.filter(frutto => {
                // In questo caso utilizziamo OR || per dire: se la prima condizione è vera restituisci quella altrimenti l'altra.
                // Di conseguenza se testoRicerca è vuoto, quindi vero si ferma li, se il testo è riempito, non vuoto, quindi falso e restituisce il filtro
                const matchNome = !testoRicerca || frutto.name.toLowerCase().includes(testoRicerca);
                const matchFamiglia = !famigliaSelect || frutto.family.toLowerCase() === famigliaSelect;
                const matchOrdine = !ordineSelect || frutto.order.toLowerCase() === ordineSelect;
                const matchGenere = !genereSelect || frutto.genus.toLowerCase() === genereSelect;

                // Da queste condizioni ritorniamo i frutti che matchano le varie condizioni
                // Un frutto ritorna solamente se rispetta tutti i match contemporaneamente
                return matchNome && matchFamiglia && matchOrdine && matchGenere
            })
        }),

        // Creiamo i computed di famiglie, ordine e genere direttamente mappando quelli in ingresso con i frutti
        // Set viene utilizzato per non ammettere duplicati, quindi se ci sono più frutti con la stessa famiglia non scriva la stessa famiglia più volte ma solo una
        // ... new con lo spread operator spalma il contenuto dell'oggetto set dentro un array, visto che lo utilizziamo con il ciclo for per il select
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