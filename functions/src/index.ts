/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from "firebase-functions";
import {onRequest} from "firebase-functions/v2/https"
import * as logger from "firebase-functions/logger";
import { getFruits, getFruitsByName } from "./services/fruit.service";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Metodo per fare la richiesta tramite getFruits, con try e catch gestiamo l'eventuale errore.
// .json viene utilizzato per eplicitare l'intenzione che sta restituendo un file json di frutti se lo stato della richiesta è 200
// stessa cosa al contrario un json con messaggio di errore se la risposta è 500
// Al posto di console.log utilizziamo logger, ottimizzato per il backend
export const api = onRequest(async (richiesta, risposta) => {
    try {
        const path = richiesta.path
        if (path.endsWith("/all")) {
            const fruits = await getFruits();
            risposta.status(200).json(fruits);
            return;
        }

        const fruitName = path.split("/").pop();
        if (fruitName) {
            const fruit = await getFruitsByName(fruitName);
            risposta.status(200).json(fruit);
            return;
        }
        risposta.status(404).json({
            message: "Endpoint non trovato"
        })
        
    } catch (error) {
        logger.error(error)

        risposta.status(500).json({
            message: "Errore durante il recupero dei frutti"
        })
    }
})

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
