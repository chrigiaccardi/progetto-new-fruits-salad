import { Router } from "express";
import { aggiungiFrutto, recuperaListaFrutta, recuperoFruttoDalNome } from "../controllers/fruit.controller";


// Con ruoter andiamo ad impostare e configurare gli url per le varie chiamate.
// ogni volta che viene chiamato un url deve far partire una funzione
const router = Router()

router.get("/", recuperaListaFrutta)

router.get("/:nome", recuperoFruttoDalNome)

router.put("/", aggiungiFrutto)

export default router;