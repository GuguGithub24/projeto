import express from "express";
import {
    listarHistorico,
    buscarHistoricoPorId
} from "../controllers/historicoSolicitacaoController.js";
const router = express.Router();

router.get("/historico", listarHistorico);
router.get("/historico/:id", buscarHistoricoPorId);

export default router;