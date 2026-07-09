import { HttpClient, httpResource } from '@angular/common/http';
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { Frutto} from '../models/frutto';
import { computed, effect, inject, resource } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { ApiFruitsService } from '../services/api-fruits-service/api-fruits-service';
import { FruttaCard } from '../../features/sidenav-content/components/frutta-card/frutta-card';


// Api per richiesta HTTP - Api cambiata per configurazione Proxy per politica Browser CORS
 const apiFrutta:string = '/api/fruit'

export type FruitsState = {
    filtroRicerca: string;
    macedonia: Frutto[];
    listaFrutta: Frutto[];
    listaRicercaFrutto: Frutto[];
    famigliaSelezionata: string;
    genereSelezionato: string;
    ordineSelezionato: string;
    erroreAggiuntaFrutto: string;
    caricamentoRicerca: boolean;
    erroreRicerca: string | null;
}

export const FruitsStore = signalStore(
    { providedIn: 'root' },

    withState({
        filtroRicerca: '',
        macedonia: [],
        listaFrutta: [],
        listaRicercaFrutto: [],
        famigliaSelezionata: '',
        genereSelezionato: '',
        ordineSelezionato: '',
        erroreAggiuntaFrutto: '',
        caricamentoRicerca: false,
        erroreRicerca: null
    } as FruitsState),

    withMethods((store, toaster = inject(HotToastService), apiFruitsService = inject(ApiFruitsService)) => {
        // Abbiamo diviso le responsabilità quindi le chiamate API sono nel service
        const resource = apiFruitsService.fruitsResource
        

        // Abbiamo cambiato approccio in questo caso. Al posto di prendere listaFrutta direttamente dalla rispostaFrutta.value
        // Andiamo a sincronizzare listaFrutta, instanziata nello state, con un metodo ed effect:
        // Il metodo sincronizza semplicemente setta i dati in ingresso in listaFrutta
        // Il meccanismo effect legge ogni cambiamento di rispostaFrutta.value e lo va ad inserire in ingresso nel metodo sincronizza
        // con un condizionale che, nel caso rispostaFrutta.value non esistesse, esce
        const sincronizzaListaFrutta = (frutti: Frutto[]) => {
            patchState(store, { listaFrutta: frutti })
            return sincronizzaListaFrutta
        }
            
        effect(() => {
            const frutti = resource.value()
            if (!frutti) return
            
            sincronizzaListaFrutta(frutti)            
        })

        

        return {

            caricamentoListaFrutta: resource.isLoading,
            erroreListaFrutta: resource.error,
            
            // istanziamo il metodo sincronizza così che possa anche utilizzarlo nei test
            sincronizzaListaFrutta,

            ricaricareListaFrutti: () => {
                resource.reload()
            },

            // Creiamo il metodo per poter aggiungere un nuovo frutto al backend
            // Dopo aver gestito la chiamata HTTP nel service con ritorno di un Observable,
            // Ci iscriviamo con subscrive per eseguire e completare il metodo
            // Il SignalMethod lo utilizziamo quando un metodo deve reagire automaticamente al cambio di stato di un valore signal
            aggiungiFrutto: (nuovoFrutto: Omit<Frutto, 'id'>) => {
                apiFruitsService.aggiungiFrutto(nuovoFrutto).subscribe({
                    next: (risposta) => {
                        toaster.success(risposta.success)
                    },
                    error: (err) => {
                        patchState(store, { erroreAggiuntaFrutto: `Errore nell'aggiunta del nuovo Frutto: ${err.statusText}` })
                        toaster.error(`Errore nell'aggiunta del frutto: ${err.statusText}`)
                    }
                })
            },

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

            // Metodo per efferrutare la ricerca tramite Barra di ricerca
            ricercaFrutto: (nomeFrutto: string) => {
                apiFruitsService.ricercaFrutto(nomeFrutto).subscribe({
                    next: (frutto) => {
                        patchState(store, {
                            listaRicercaFrutto: frutto ? [frutto] : [],
                            caricamentoRicerca: false,
                            erroreRicerca: null
                        })
                    },
                    error: () => {
                        patchState(store, {
                            listaRicercaFrutto: [],
                            caricamentoRicerca: false,
                            erroreRicerca: 'Ricerca Non Riuscita'
                        })
                        toaster.error('Ricerca Non Riuscita')
                    }
                })
            },

            // Creiamo un metodo per poter settare il filtroRicerca
            setFiltroRicerca: (testo: string) => {
                patchState(store, { filtroRicerca: testo });

                if (!testo) {
                    patchState(store, {
                        listaRicercaFrutto: [],
                        caricamentoRicerca: false,
                        erroreRicerca: null
                    });
                    return;
                }

                patchState(store, {
                    caricamentoRicerca: true,
                    erroreRicerca: null
                });

                // Facciamo partire la richiesta HTTP dal settaggio del filtro
                apiFruitsService.ricercaFrutto(testo).subscribe({
                    next: (frutto) => {
                        patchState(store, {
                            listaRicercaFrutto: [frutto],
                            caricamentoRicerca: false,
                            erroreRicerca: null
                        })
                    },
                    error: () => {
                        patchState(store, {
                            listaRicercaFrutto: [],
                            caricamentoRicerca: false,
                            erroreRicerca: 'Ricerca non Riuscita'
                        });
                    }
                })
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
                    listaRicercaFrutto: [],
                    caricamentoRicerca: false,
                    erroreRicerca: null,
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
            const famigliaSelect = store.famigliaSelezionata().toLowerCase().trim();
            const ordineSelect = store.ordineSelezionato().toLowerCase().trim();
            const genereSelect = store.genereSelezionato().toLowerCase().trim();

            // Se tutti i filtri sono azzerati allora restituisci la listaFrutta completa come da lettura backend
            if (!famigliaSelect && !ordineSelect && !genereSelect) return store.listaFrutta();

            // Eseguiamo un filtraggio della listaFrutta, la callback frutto restituisce, per ogni frutto, true se deve essere tenuto e false se scartato
            return store.listaFrutta()?.filter(frutto => {
                // In questo caso utilizziamo OR || per dire: se la prima condizione è vera restituisci quella altrimenti l'altra.
                // Di conseguenza se testoRicerca è vuoto, quindi vero si ferma li, se il testo è riempito, non vuoto, quindi falso e restituisce il filtro
                const matchFamiglia = !famigliaSelect || frutto.family.toLowerCase() === famigliaSelect;
                const matchOrdine = !ordineSelect || frutto.order.toLowerCase() === ordineSelect;
                const matchGenere = !genereSelect || frutto.genus.toLowerCase() === genereSelect;

                // Da queste condizioni ritorniamo i frutti che matchano le varie condizioni
                // Un frutto ritorna solamente se rispetta tutti i match contemporaneamente
                return matchFamiglia && matchOrdine && matchGenere
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

        // Questo computed serve per selezionare quale lista visualizzare
        listaAttiva: computed(() => {
            return store.filtroRicerca() ? store.listaRicercaFrutto() : store.listaFrutta()
        })

    }))

    

    
)