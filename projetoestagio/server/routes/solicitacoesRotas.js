import express from "express";
import {
  cadastrarSolicitacao,
  listarSolicitacoes,
  atribuirResponsavel,
  alterarStatus
} from "../controllers/solicitacoesController.js";
const router = express.Router();

router.post("/solicitacao", cadastrarSolicitacao);
router.get("/solicitacao", listarSolicitacoes);
router.put("/solicitacao/:id/atribuir", atribuirResponsavel);
router.put("/solicitacao/:id/status", alterarStatus);

export default router;