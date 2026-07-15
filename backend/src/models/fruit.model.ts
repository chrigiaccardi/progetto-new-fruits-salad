
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

export type NuovoFrutto = Omit<Frutto, "id">

export interface RispostaMessaggioAPI {
    message: string
}
