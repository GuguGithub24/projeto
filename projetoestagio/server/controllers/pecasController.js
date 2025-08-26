import db from "../database.js";

export function cadastrarPeca(req, res) {
  const { NOME, DESCRICAO, MODELO, MARCA, FORNECEDOR, PATRIMONIO } = req.body;

  db.get((err, conn) => {
    if (err) return res.status(500).json({ error: err.message });

    conn.query("INSERT INTO PECAS (NOME, DESCRICAO, MODELO, MARCA, FORNECEDOR, PATRIMONIO) VALUES (?, ?, ?, ?, ?, ?)", [NOME, DESCRICAO, MODELO, MARCA, FORNECEDOR, PATRIMONIO], (err2) => {
      conn.detach();
      if (err2) return res.status(500).json({ error: err2.message });

      res.status(201).json({
        message: "Peça cadastrada com sucesso",
        peca: { NOME, DESCRICAO, MODELO, MARCA, FORNECEDOR, PATRIMONIO }
      });
    });
  });
}

export function listarPecas(req, res) {
  db.get((err, conn) => {
    if (err) return res.status(500).json({ error: err.message });

    conn.query("SELECT * FROM PECAS", (err2, result) => {
      conn.detach();
      if (err2) return res.status(500).json({ error: err2.message });
      res.json(result);
    });
  });
}

export function listarPecasPorId(req, res) {
  const { id } = req.params;

  db.get((err, conn) => {
    if (err) return res.status(500).json({ error: err.message });

    conn.query("SELECT * FROM PECAS WHERE ID_PECA = ?", [id], (err2, result) => {
      conn.detach();
      if (err2) return res.status(500).json({ error: err2.message });
      res.json(result);
    });
  });
}

export function atualizarPeca(req, res) {
  const { id } = req.params;
  const { NOME, DESCRICAO, MODELO, MARCA, FORNECEDOR, PATRIMONIO } = req.body;

  db.get((err, conn) => {
    if (err) return res.status(500).json({ error: err.message });

    const sql = `
      UPDATE PECAS
      SET NOME = ?,
          DESCRICAO = ?,
          MODELO = ?,
          MARCA = ?,
          FORNECEDOR = ?,
          PATRIMONIO = ?
      WHERE ID_PECA = ?
    `;

    conn.query(
      sql,
      [NOME, DESCRICAO, MODELO, MARCA, FORNECEDOR, PATRIMONIO, parseInt(id)],
      (err2) => {
        conn.detach();
        if (err2) return res.status(500).json({ error: err2.message });

        res.status(200).json({
          message: "Peça atualizada com sucesso",
          peca: { ID: id, NOME, DESCRICAO, MODELO, MARCA, FORNECEDOR, PATRIMONIO }
        });
      }
    );
  });
}

export function deletarPeca(req, res) {
  const id = parseInt(req.params.id);

  db.get((err, conn) => {
    if (err) return res.status(500).json({ error: err.message });

    const sql = "DELETE FROM PECAS WHERE ID_PECA = ?";

    conn.query(sql, [id], (err2) => {
      conn.detach();
      if (err2) return res.status(500).json({ error: err2.message });

      res.status(200).json({
        message: `Peça com ID ${id} deletada com sucesso.`,
      });
    });
  });
}