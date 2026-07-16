import { API } from "../config/api.config"
import { Frutto, NuovoFrutto, RispostaMessaggioAPI } from "../models/fruit.model";

// Funzione per il recupero Lista Frutti
export async function recuperoFruttiService() {
  const url = `${API.fruityvice.baseUrl}/all`;

  const risposta = await fetch(url);

  if (!risposta.ok) {
    throw new Error("Errore durante il recupero dei dati da Fruityvice.");
  }

  const dati = await risposta.json();

  return dati as Frutto[];
}

// Funzione per il recupero del singolo Frutto tramite il nome
export async function recuperoFruttoDalNomeService(nome: string) {
  const url = `${API.fruityvice.baseUrl}/${nome}`;

  const risposta = await fetch(url);

  if (!risposta.ok) {
    throw new Error("Frutto non trovato!")
  }

  const dati = await risposta.json()
  return dati as Frutto
}

// Funzione per l'aggiunta di un nuovo frutto
export async function aggiungiFruttoService(nuovoFrutto: NuovoFrutto) {
  const url = `${API.fruityvice.baseUrl}`

  const risposta = await fetch(url,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuovoFrutto),
  })

  if (!risposta.ok) {
    throw new Error("Errore durante l'aggiunta del frutto.");
  }

  const dati = await risposta.json();
  return dati as RispostaMessaggioAPI;
}

