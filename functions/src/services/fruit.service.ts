/**
 * Importiamo API per poterlo utilizzare
 */

import { API } from "../config/api.config";
import { NuovoFrutto } from "../models/fruit.model";

/**
 * Ritorna tutti i frutti da Fruityvice API
 */

export async function recuperoFrutti() {
    const risposta = await fetch(
        `${API.fruityvice.baseUrl}/all`
    );

    if (!risposta.ok) {
        throw new Error("Errore durante il recupero dei dati da Fruityvice.")
    }

    return risposta.json();
}

/**
 * Ritorna il singolo frutto cercato
 */

export async function recuperoFruttoDalNome(name:string) {
    const risposta = await fetch(
        `${API.fruityvice.baseUrl}/${name}`
    );

    if (!risposta.ok) {
        throw new Error("Frutto non trovato");
    }
    return risposta.json()
}

/**
 * Invia un nuovo frutto a Fruityvice
 */

export async function aggiungiFrutto(fruit: NuovoFrutto) {
    const risposta = await fetch(API.fruityvice.baseUrl, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(fruit)
        
    });

    if (!risposta.ok) {
        throw new Error("Errore durante l'aggiunta del frutto.")
    }

    return risposta.json()
}