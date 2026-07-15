import { API } from "../config/api.config"
import { Frutto } from "../models/fruit.model";

export async function recuperoFrutti() {
  const url = `${API.fruityvice.baseUrl}/all`;
  
  throw new Error(
    "Errore test"
   );
  
    const risposta = await fetch(url);
  
    if (!risposta.ok) {
      throw new Error("Errore durante il recupero dei dati da Fruityvice.");
    }
  
    const dati = await risposta.json();
  
    return dati as Frutto[];
}