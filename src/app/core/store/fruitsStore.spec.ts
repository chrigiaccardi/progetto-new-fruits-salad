import { TestBed } from "@angular/core/testing";
import { FruitsStore } from "./fruitsStore";
import { Frutto } from "../models/frutto";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing"
import { ApplicationRef } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";

// Describe raggruppa i test che appartengono allo stesso argomento (FruitsStore)
describe('FruitsStore', () => {
    // Qua istanziamo le variabili
    let httpTesting: HttpTestingController;
    let store: InstanceType<typeof FruitsStore>
    
    // Creo dei Mock da poter utilizzare come muletti
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
    const fruttoFake: Omit<Frutto, 'id'> = {
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
    }

    // Il beforeEach viene eseguito prima di ogni test così da avere l'ambiente pulito
    beforeEach(() => {
        // Si configura l'ambiente con i providers così angular sa dove recuperarli
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
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

    it('dovrebbe creare un nuovo frutto', () => {
        store.aggiungiFrutto(fruttoFake)
        const richiestaPUT = httpTesting.expectOne({ method: 'PUT', url: '/api/fruit' })
        expect(richiestaPUT.request.body).toEqual(fruttoFake)
    })

    it('Errore aggiungiFrutto', () => {
        store.aggiungiFrutto(fruttoFake)
        const richiestaPUT = httpTesting.expectOne({ method: 'PUT', url: '/api/fruit' })
        richiestaPUT.flush('Errore Server', {
            status: 417,
            statusText: 'The given JSON could not be processed'
        })

        expect(store.erroreAggiuntaFrutto()).toContain(`Errore nell'aggiunta del nuovo Frutto`)
    })

    it('Dovrebbe dare la somma dei valori nutrizionali', () => {
        // Aggiungo alla macedonia due frutti mock
        store.aggiungiAMacedonia(FRUTTI_MOCK[0])
        store.aggiungiAMacedonia(FRUTTI_MOCK[1])
        // Istanzio i totali
        const totali = store.totaliNutrienti()
        // Mi aspetto che calorie e zuccheri sia la somma giusta
        expect(totali.calorie).toBe(148)
        expect(totali.zuccheri).toBe(22)
    })
})

