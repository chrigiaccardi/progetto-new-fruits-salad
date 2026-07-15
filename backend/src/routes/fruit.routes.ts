import { Router } from "express";
import { recuperaListaFrutta } from "../controllers/fruit.controller";

const router = Router()

router.get("/", recuperaListaFrutta)

export default router