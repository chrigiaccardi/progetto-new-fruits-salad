import { Request, Response, NextFunction } from "express";
import { recuperoFrutti, fetchRecuperoFruttoDalNome } from "../services/fruit.service";

// la funzione  del controller indica che quando viene chiamata bisogna eseguire questa operazione specifica
// così con Request e Response typescrpit sa che sono oggetti express quindi req.body, req.params sa cosa significano
export async function recuperaListaFrutta(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const frutti = await recuperoFrutti()
        res.json(frutti)
    } catch (error) {
        // Con next dichiariamo ad Express che l'errore deve essere passato al middleware per essere gestito
     next(error)
    }
    
}

// Aggiungiamo la funzione recuperaFruttoDalNome
export async function recuperoFruttoDalNome(
    req: Request<{nome: string}>,
    res: Response,
    next: NextFunction,
) {
    try {
        const { nome } = req.params
        const frutto = await fetchRecuperoFruttoDalNome(nome)
        res.json(frutto)
    } catch (error) {
        next(error)
    }
}

// Aggiungiamo Funzione per aggiungere un nuovo frutto
// export async function aggiungiFrutto(
//     req: Request,
//     res: Response,
//     next: NextFunction,
// ) {
//     try {
//         res.json({
//             message: "Aggiunta Frutto"
//         })
//     } catch (error) {
//         next(error)
//     }
// }