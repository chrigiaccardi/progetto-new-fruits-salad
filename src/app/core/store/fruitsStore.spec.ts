import { TestBed } from "@angular/core/testing";
import { FruitsStore } from "./fruitsStore";
import { Frutto } from "../models/frutto";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing"
import { ApplicationRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

// Describe raggruppa i test che appartengono allo stesso argomento (FruitsStore)
describe('FruitsStore', () => {
    // Qua istanziamo le variabili
    let httpTesting: HttpTestingController;
    let store: InstanceType<typeof FruitsStore>
    
    const FRUTTI_MOCK: Frutto[] = [
        {
            id: 1,
            name: 'Apple',
            family: 'Rosaceae',
            genus: 'Malus',
            order: 'Rosales',
            nutritions: {
            carbohydrates: 14,
            protein: 0.3,
            fat: 0.2,
            calories: 52,
            sugar: 10
            }
        },
        {
            id: 2,
            name: 'Banana',
            family: 'Musaceae',
            genus: 'Musa',
            order: 'Zingiberales',
            nutritions: {
            carbohydrates: 23,
            protein: 1.1,
            fat: 0.3,
            calories: 96,
            sugar: 12
            }
        },
        {
            id: 3,
            name: 'Orange',
            family: 'Rutaceae',
            genus: 'Citrus',
            order: 'Sapindales',
            nutritions: {
            carbohydrates: 12,
            protein: 0.9,
            fat: 0.1,
            calories: 47,
            sugar: 9
            }
        },
        {
            id: 4,
            name: 'Strawberry',
            family: 'Rosaceae',
            genus: 'Fragaria',
            order: 'Rosales',
            nutritions: {
            carbohydrates: 8,
            protein: 0.7,
            fat: 0.3,
            calories: 33,
            sugar: 4.9
            }
        },
        {
            id: 5,
            name: 'Mango',
            family: 'Anacardiaceae',
            genus: 'Mangifera',
            order: 'Sapindales',
            nutritions: {
            carbohydrates: 15,
            protein: 0.8,
            fat: 0.4,
            calories: 60,
            sugar: 13
            }
        }
        ];

    // Il beforeEach viene eseguito prima di ogni test così da avere l'ambiente pulito
    beforeEach(() => {
        // Si configura l'ambiente con i providers così angular sa dove recuperarli
        TestBed.configureTestingModule({
            providers: [
                FruitsStore,
                provideHttpClientTesting(),
            ]
        });
        // Recuperiamo  i providers e li assegnamo
        httpTesting = TestBed.inject(HttpTestingController)
        store = TestBed.inject(FruitsStore)
    });

    // Con AfterEach controlliamo che dopo ogni test non rimangono chiamate http pendenti
    afterEach(() => {
        httpTesting.verify()
    })

    // Inizio Test
    it('Lo store dovrebbe essere creato', () => {
        expect(store).toBeTruthy()
    })

    it('setFiltroRicerca imposta filtroRicerca', () => {
        store.setFiltroRicerca('Fragola')
        expect(store.filtroRicerca()).toBe('Fragola')
    })

    it('resetFiltri dovrebbe resetare famiglia, ordine e genere', () => {
        store.setFamigliaSelezionata('Famiglia')
        store.setGenereSelezionato('Genere')
        store.setOrdineSelezionato('Ordine')
        store.setFiltroRicerca('Filtro')

        store.resetFiltri()

        expect(store.filtroRicerca()).toBe('')
        expect(store.famigliaSelezionata()).toBe('')
        expect(store.genereSelezionato()).toBe('')
        expect(store.ordineSelezionato()).toBe('')
    })

    it('Dovrebbe ritornare la listaFrutti() completa', () => {

        const richiestaGET = httpTesting.expectOne((richiesta) => 
            richiesta.method === 'GET' &&
            richiesta.url === '/api/fruit/all'
        )
        richiestaGET.flush(FRUTTI_MOCK)

        // faccio partire il metodo reset che imposta tutti i valori a ''
        store.resetFiltri()

        // toEqual confronta gli oggetti/array in profondità
        expect(store.listaFruttiFiltrata()).toEqual(FRUTTI_MOCK)
     })

})