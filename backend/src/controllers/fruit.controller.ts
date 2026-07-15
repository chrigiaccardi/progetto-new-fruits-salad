import { Request, Response } from "express";
import { recuperoFrutti } from "../services/fruit.service";

// la funzione  del controller indica che quando viene chiamata bisogna eseguire questa operazione specifica
// così con Request e Response typescrpit sa che sono oggetti express quindi req.body, req.params sa cosa significano
export async function recuperaListaFrutta(
    req: Request,
    res: Response
) {
    try {
        const frutti = await recuperoFrutti()
        res.json(frutti)
    } catch (error) {
        res.status(500).json({
            message: "Errore Recupero Frutti"
        })
    }
    
}