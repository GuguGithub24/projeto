import express from "express";
import cors from "cors";
import usuariosRoutes from "./routes/usuarios.routes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/", usuariosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

setInterval(() => {
  console.log("Servidor ainda está vivo...");
}, 3000);