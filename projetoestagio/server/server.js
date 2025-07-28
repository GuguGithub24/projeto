import express from "express";
import cors from "cors";
import db from "./database.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/usuarios", (req, res) => {
  db.get((err, conn) => {
    if (err) return res.status(500).json({ error: err.message });

    conn.query("SELECT * FROM USUARIOS", (err, result) => {
      conn.detach();
      if (err) return res.status(500).json({ error: err.message });

      res.json(result);
    });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend rodando em http://localhost:${PORT}`);
});
