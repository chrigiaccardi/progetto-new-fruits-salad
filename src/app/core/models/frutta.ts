export interface Frutta {
    name: string;
    id: string;
    family: string;
    genus: string;
    order: string;
    nutrition: {
        carbohydrates: string;
        protein: string;
        fat: string;
        calories: string;
        sugar: string;
    }
}