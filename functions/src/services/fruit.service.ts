import { API } from "../config/api.config";

/**
 * Ritorna tutti i frutti da Fruityvice API
 */

export async function getFruits() {
    const response = await fetch(
        `${API.fruityvice.baseUrl}/all`
    );

    if (!response.ok) {
        throw new Error("Errore durante il recupero dei dati da Fruityvice.")
    }

    return response.json();
}

/**
 * Ritorna il singolo frutto cercato
 */

export async function getFruitsByName(name:string) {
    const response = await fetch(
        `${API.fruityvice.baseUrl}/${name}`
    );

    if (!response.ok) {
        throw new Error("Frutto non trovato");
    }
    return response.json()
}