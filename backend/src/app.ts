import express from "express"
import cors from "cors"

import fruitRoutes from "./routes/fruit.routes"
import { errorMiddleware } from "./middleware/error.middleware"

// Qui nasce l'istanza Express
const app = express()

// Middleware è una funziona che sta nel mezzo tra la richiesta client e la risposta del server.
// Può controllare qualcosa, modificare, aggiungere info, bloccare ecc...
// Accetto dati in entrata dal frontend Angular locale
app.use(
    cors({
        origin: "http://localhost:4200"
    })
)
// Lettura del body JSON
app.use(express.json())

// Routes - Creazione prefisso davanti alle fruitRoutes
app.use("/api/fruit", fruitRoutes)

// Impostiamo il Middleware per la gestione degli errori
app.use(errorMiddleware)

export default app