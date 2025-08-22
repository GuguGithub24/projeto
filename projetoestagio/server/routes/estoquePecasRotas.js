import express from "express";
import {
    cadastrarPeca,
    listarEstoquePecas,
    listarEstoquePecasPorId,
    atualizarPeca,
    deletarPeca
} from "../controllers/estoquePecasController.js";
const router = express.Router();

router.post("/pecas", cadastrarPeca);
router.get("/pecas", listarEstoquePecas);
router.get("/pecas/:id", listarEstoquePecasPorId);
router.put("/pecas/:id", atualizarPeca);
router.delete("/pecas/:id", deletarPeca);

export default router;