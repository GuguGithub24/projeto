import express from "express";
import cors from "cors";
import usuariosRoutes from "./routes/usuarioRotas.js";
import servicosRoutes from "./routes/tipoServicoRotas.js"
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/", usuariosRoutes);
app.use("/", servicosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});