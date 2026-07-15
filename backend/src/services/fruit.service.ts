import { API } from "../config/api.config"
import { Frutto } from "../models/fruit.model";

// Funzione per il recupero Lista Frutti
export async function recuperoFrutti() {
  const url = `${API.fruityvice.baseUrl}/all`;

  const risposta = await fetch(url);

  if (!risposta.ok) {
    throw new Error("Errore durante il recupero dei dati da Fruityvice.");
  }

  const dati = await risposta.json();

  return dati as Frutto[];
}

// Funzione per il recupero del singolo Frutto tramite il nome
export async function fetchRecuperoFruttoDalNome(nome: string) {
  const url = `${API.fruityvice.baseUrl}/${nome}`;

  const risposta = await fetch(url);

  if (!risposta.ok) {
    throw new Error("Frutto non trovato!")
  }

  const dati = await risposta.json()
  return dati as Frutto
}

// Funzione per l'aggiunta di un nuovo frutto
// export async function aggiungiFrutto(frutto: Frutto) {
  
// }

