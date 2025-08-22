import db from "../database.js";

export function cadastrarPeca(req, res) {
  const { NOME_PECA, DESCRICAO, QUANTIDADE } = req.body;

  db.get((err, conn) => {
    if (err) return res.status(500).json({ error: err.message });

    conn.query("INSERT INTO ESTOQUE_PECAS (NOME_PECA, DESCRICAO, QUANTIDADE) VALUES (?, ?, ?)", [NOME_PECA, DESCRICAO, QUANTIDADE], (err2) => {
      conn.detach();
      if (err2) return res.status(500).json({ error: err2.message });

      res.status(201).json({
        message: "Peça cadastrada com sucesso",
        peca: { NOME_PECA, DESCRICAO, QUANTIDADE }
      });
    });
  });
}

export function listarEstoquePecas(req, res) {
  db.get((err, conn) => {
    if (err) return res.status(500).json({ error: err.message });

    conn.query("SELECT * FROM ESTOQUE_PECAS", (err2, result) => {
      conn.detach();
      if (err2) return res.status(500).json({ error: err2.message });
      res.json(result);
    });
  });
}

export function listarEstoquePecasPorId(req, res) {
  const { id } = req.params;

  db.get((err, conn) => {
    if (err) return res.status(500).json({ error: err.message });

    conn.query("SELECT * FROM ESTOQUE_PECAS WHERE ID_PECA = ?", [id], (err2, result) => {
      conn.detach();
      if (err2) return res.status(500).json({ error: err2.message });
      res.json(result);
    });
  });
}

export function atualizarPeca(req, res) {
  const { id } = req.params;
  const { NOME_PECA, DESCRICAO, QUANTIDADE } = req.body;

  db.get((err, conn) => {
    if (err) return res.status(500).json({ error: err.message });

    const sql = `
      UPDATE ESTOQUE_PECAS
      SET NOME_PECA = ?,
          DESCRICAO = ?,
          QUANTIDADE = ?
      WHERE ID_PECA = ?
    `;

    conn.query(
      sql,
      [NOME_PECA, DESCRICAO, QUANTIDADE, parseInt(id)],
      (err2) => {
        conn.detach();
        if (err2) return res.status(500).json({ error: err2.message });

        res.status(200).json({
          message: "Peça atualizada com sucesso",
          peca: { ID_PECA: id, NOME_PECA, DESCRICAO, QUANTIDADE }
        });
      }
    );
  });
}

export function deletarPeca(req, res) {
  const id = parseInt(req.params.id);

  db.get((err, conn) => {
    if (err) return res.status(500).json({ error: err.message });

    const sql = "DELETE FROM ESTOQUE_PECAS WHERE ID_PECA = ?";

    conn.query(sql, [id], (err2) => {
      conn.detach();
      if (err2) return res.status(500).json({ error: err2.message });

      res.status(200).json({
        message: `Peça com ID ${id} deletada com sucesso.`,
      });
    });
  });
}