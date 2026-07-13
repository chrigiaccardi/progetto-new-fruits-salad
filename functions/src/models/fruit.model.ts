/**
 * Creiamo un modello Frutto anche per il backend
 */

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

/**
 * Creiamo un nuovo tipo per Nuovo Frutto
 */

export type NuovoFrutto = Omit<Frutto, 'id'>
