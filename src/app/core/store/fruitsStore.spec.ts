import { TestBed } from "@angular/core/testing";
import { FruitsStore } from "./fruitsStore";
import { Frutto } from "../models/frutto";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing"
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
                provideHttpClientTesting(),
                FruitsStore,
            ]
        });
        // Recuperiamo  i providers e li assegnamo
        store = TestBed.inject(FruitsStore)
        httpTesting = TestBed.inject(HttpTestingController)
        

    });

    // Con AfterEach controlliamo che dopo ogni test non rimangono chiamate http pendenti
    afterEach(() => {
        httpTesting.verify();
        TestBed.resetTestingModule()
    })

    // Inizio Test
    it('Lo store dovrebbe essere creato', () => {
        expect(store).toBeTruthy()
    })

    // Essendo che la ricerca parte alla modifica di filtroRicerca, dobbiamo intercettare la richiesta e ritornare un frutto singolo
    // In questo caso utilizzo il mock di tutti i frutti selezionandone 1. Non posso utilizzare FruttoFake perchè manca di id
    it('setFiltroRicerca imposta filtroRicerca', () => {
        store.setFiltroRicerca('Fragola')
        const richiestaGET = httpTesting.expectOne({ method: 'GET', url: '/api/fruit/Fragola' })
        richiestaGET.flush(FRUTTI_MOCK[0])
        expect(store.filtroRicerca()).toBe('Fragola')
    })

    it('resetFiltri dovrebbe resetare il campo filtro ricerca,famiglia, ordine e genere', () => {
        store.setFamigliaSelezionata('Famiglia')
        store.setGenereSelezionato('Genere')
        store.setOrdineSelezionato('Ordine')
        store.setFiltroRicerca('Fragola')

        // Anche qua essendo che per testare il reset imposto il filtroRicerca, parte la richiesta HTTP.
        // Quindi dobbiamo intercettarla e chiuderla con flush
        const richiestaGET = httpTesting.expectOne({ method: 'GET', url: '/api/fruit/Fragola' })
        richiestaGET.flush(FRUTTI_MOCK[0])

        store.resetFiltri()

        expect(store.filtroRicerca()).toBe('')
        expect(store.famigliaSelezionata()).toBe('')
        expect(store.genereSelezionato()).toBe('')
        expect(store.ordineSelezionato()).toBe('')
       
        // Essendo che resetFiltri non fa partire essa stessa la richiesta HTTP, utilizziamo ExpectNone per verificare che NON sia PARTITA la richiesta
        httpTesting.expectNone('/api/fruit')
    })

    it('dovrebbe creare un nuovo frutto', () => {
        store.aggiungiFrutto(fruttoFake)
        const richiestaPUT = httpTesting.expectOne({ method: 'PUT', url: '/api/fruit' })
        expect(richiestaPUT.request.body).toEqual(fruttoFake)
        expect(richiestaPUT.request.method).toBe('PUT')
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

    it('listaFruttaFiltrata dovrebbe ritornare lista completa', () => {
        // setto il mock all'interno della lista
        store.sincronizzaListaFrutta(FRUTTI_MOCK)
        store.resetFiltri()
        expect(store.listaFruttiFiltrata()).toEqual(FRUTTI_MOCK)
    })

    it('Dovrebbe ritornare solamente i frutti filtrati per famiglia', () => {
        store.sincronizzaListaFrutta(FRUTTI_MOCK)
        store.setFamigliaSelezionata('Rosaceae')
        // istanzio i risultati per poterli controllare
        const risultati = store.listaFruttiFiltrata()
        expect(risultati.length).toBe(2)
        // mappo i risultati per controllare i nomi
        const nomiFrutti = risultati.map(f => f.name)
        expect(nomiFrutti).toEqual(['Apple', 'Strawberry'])
    })

    it('Dovrebbe ritornare solamente i frutti filtrati per ordine', () => {
        store.sincronizzaListaFrutta(FRUTTI_MOCK)
        store.setOrdineSelezionato('Sapindales')

        const risultati = store.listaFruttiFiltrata()
        expect(risultati.length).toBe(2)

        const nomiFrutti = risultati.map(f => f.name)
        expect(nomiFrutti).toEqual(['Orange', 'Mango'])
    })
    
    it('Dovrebbe ritornare solamente i frutti filtrati per genere', () => {
        store.sincronizzaListaFrutta(FRUTTI_MOCK)
        store.setGenereSelezionato('Musa')

        const risultati = store.listaFruttiFiltrata()
        expect(risultati.length).toBe(1)

        const nomiFrutti = risultati.map(f => f.name)
        expect(nomiFrutti).toEqual(['Banana'])
    })

    it('Dovrebbe ritornare solamente i frutti filtrati (famiglia + genere)', () => {
        store.sincronizzaListaFrutta(FRUTTI_MOCK)
        store.setFamigliaSelezionata('Rosaceae')
        store.setGenereSelezionato('Fragaria')

        const risultati = store.listaFruttiFiltrata()
        expect(risultati.length).toBe(1)

        const nomiFrutti = risultati.map(f => f.name)
        expect(nomiFrutti).toEqual(['Strawberry'])
    })

    it('Dovrebbe ritornare solamente i frutti ricercati dalla barra di ricerca', () => {
        store.sincronizzaListaFrutta(FRUTTI_MOCK)
        store.setFiltroRicerca('Apple')

        const richiestaGET = httpTesting.expectOne({ method: 'GET', url: '/api/fruit/Apple' })
        richiestaGET.flush(FRUTTI_MOCK[0])

        const risultati = store.listaRicercaFrutto()
        expect(risultati.length).toBe(1)

        const nomiFrutti = risultati.map(f => f.name)
        expect(nomiFrutti).toEqual(['Apple'])

    })

    it('Dovrebbe dare la listaFruttiFiltrata vuota', () => {
        store.sincronizzaListaFrutta(FRUTTI_MOCK)
        store.setFamigliaSelezionata('FamigliaInesistente')

        expect(store.listaFruttiFiltrata()).toEqual([])
    })

    it('Le famiglie disponibili dovrebbero essere tutte e non duplicate', () => {
        store.sincronizzaListaFrutta(FRUTTI_MOCK)
        const famiglie = store.famiglieDisponibili()
        expect(famiglie).toEqual(['Rosaceae', 'Musaceae', 'Rutaceae', 'Anacardiaceae'])
        expect(famiglie.length).toBe(4)
    })

    it('I Generi disponibili dovrebbero essere tutti e non duplicati', () => {
        store.sincronizzaListaFrutta(FRUTTI_MOCK)
        const generi = store.generiDisponibili()
        expect(generi).toEqual(['Malus', 'Musa', 'Citrus', 'Fragaria', 'Mangifera'])
        expect(generi.length).toBe(5)
    })

    it('Gli ordini disponibili dovrebbero essere tutti e non duplicati', () => {
        store.sincronizzaListaFrutta(FRUTTI_MOCK)
        const ordini = store.ordiniDisponibili()
        expect(ordini).toEqual(['Rosales', 'Zingiberales', 'Sapindales'])
        expect(ordini.length).toBe(3)
    })
    
})

