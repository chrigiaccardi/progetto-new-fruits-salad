export interface Frutto {
    name: string;
    id: number;
    family: string;
    genus: string;
    order: string;
    nutritions: {
        carbohydrates: number | null;
        protein: number | null;
        fat: number | null;
        calories: number | null;
        sugar: number | null;
    }
}

// Creiamo un type custom per poter ricevere il messaggio di risposta e l'oggetto frutto
export type rispostaAggiungiFrutto = {
    message: string;
    frutto: Frutto;
}