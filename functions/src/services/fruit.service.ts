/**
 * Importiamo API per poterlo utilizzare
 */
import {API} from "../config/api.config";
import {Frutto, NuovoFrutto, RispostaMessaggioAPI} from "../models/fruit.model";

/**
 * Ritorna tutta la lista frutti da Fruityvice API
 *
 * @return {Promise<Frutto[]>} Lista dei frutti
 */
export async function recuperoFrutti() {
  const url = `${API.fruityvice.baseUrl}/all`;

  const risposta = await fetch(url);

  if (!risposta.ok) {
    throw new Error("Errore durante il recupero dei dati da Fruityvice.");
  }

  const dati = await risposta.json();

  return dati as Frutto[];
}

/**
 * Ricerca del singolo frutto dal nome
 *
 * @param {string} name Nome del Frutto
 *
 * @return {Promise<Frutto>} Frutto ricercato
 */
export async function recuperoFruttoDalNome(name:string) {
  const risposta = await fetch(
    `${API.fruityvice.baseUrl}/${name}`
  );

  if (!risposta.ok) {
    throw new Error("Frutto non trovato");
  }

  const dati = await risposta.json();
  return dati as Frutto;
}

/**
 * Invia un nuovo frutto a Fruityvice
 *
 * @param {NuovoFrutto} fruit Nuovo frutto da inviare
 *
 * @return {Promise<RispostaMessaggioAPI>} Messaggio Frutto inviato con successo
 */
export async function aggiungiFrutto(fruit: NuovoFrutto) {
  const risposta = await fetch(API.fruityvice.baseUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fruit),

  });

  if (!risposta.ok) {
    throw new Error("Errore durante l'aggiunta del frutto.");
  }

  const dati = await risposta.json();
  return dati as RispostaMessaggioAPI;
}
