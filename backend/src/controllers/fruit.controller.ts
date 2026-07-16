import { Request, Response, NextFunction } from "express";
import { aggiungiFruttoService, recuperoFruttiService, recuperoFruttoDalNomeService } from "../services/fruit.service";
import { NuovoFrutto } from "../models/fruit.model";


// la funzione  del controller indica che quando viene chiamata bisogna eseguire questa operazione specifica
// così con Request e Response typescrpit sa che sono oggetti express quindi req.body, req.params sa cosa significano
export async function recuperaListaFrutta(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const frutti = await recuperoFruttiService()
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
        const frutto = await recuperoFruttoDalNomeService(nome)
        res.json(frutto)
    } catch (error) {
        next(error)
    }
}

// Aggiungiamo Funzione per aggiungere un nuovo frutto
export async function aggiungiFrutto(
    req: Request<{},{}, NuovoFrutto>,
    res: Response,
    next: NextFunction,
) {
    try {
        const nuovoFrutto = req.body
        const risposta = await aggiungiFruttoService(nuovoFrutto)
        res.status(201).json(risposta)

    } catch (error) {
        next(error)
    }
}