import db from "../database.js";
import bcrypt from "bcrypt";
import schemaUsuario from "../schemas/usuarioSchema.js";


export function listarUsuarios(req, res) {
  db.get((err, conn) => {
    if (err) return res.status(500).json({ error: err.message });

    conn.query("SELECT * FROM USUARIOS", (err2, result) => {
      conn.detach();
      if (err2) return res.status(500).json({ error: err2.message });
      res.json(result);
    });
  });
}

export function cadastrarUsuario(req, res) {
  const { error, value } = schemaUsuario.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: "Dados inválidos",
      detalhes: error.details.map((d) => d.message)
    });
  }

  const { NOME_USUARIO, DEPARTAMENTO, CPF, EMAIL, TIPO_USUARIO, SENHA } = value;

  bcrypt.hash(SENHA, 10, (err, senhaCriptografada) => {
    if (err) return res.status(500).json({ error: "Erro ao criptografar senha." });

    db.get((err, conn) => {
      if (err) return res.status(500).json({ error: err.message });

      const sql = `
        INSERT INTO USUARIOS (NOME_USUARIO, DEPARTAMENTO, CPF, EMAIL, TIPO_USUARIO, SENHA) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      conn.query(
        sql,
        [NOME_USUARIO, DEPARTAMENTO, CPF, EMAIL, TIPO_USUARIO, senhaCriptografada],
        (err2) => {
          conn.detach();
          if (err2) return res.status(500).json({ error: err2.message });

          res.status(201).json({
            message: "Usuário cadastrado com sucesso",
            usuario: { NOME_USUARIO, DEPARTAMENTO, CPF, EMAIL, TIPO_USUARIO }
          });
        }
      );
    });
  });
}

export function atualizarUsuario(req, res) {
  const { id } = req.params;
  const { NOME_USUARIO, DEPARTAMENTO, CPF, EMAIL, TIPO_USUARIO, SENHA } = req.body;

  db.get((err, conn) => {
    if (err) return res.status(500).json({ error: err.message });

    const sql = `
      UPDATE USUARIOS 
      SET NOME_USUARIO = ?, 
          DEPARTAMENTO = ?, 
          CPF = ?, 
          EMAIL = ?, 
          TIPO_USUARIO = ?, 
          SENHA = ?
      WHERE ID_USUARIOS = ?
    `;

    conn.query(
      sql,
      [NOME_USUARIO, DEPARTAMENTO, CPF, EMAIL, TIPO_USUARIO, SENHA, parseInt(id)],
      (err2) => {
        conn.detach();
        if (err2) return res.status(500).json({ error: err2.message });

        res.status(200).json({
          message: "Usuário atualizado com sucesso",
          usuario: { ID_USUARIOS: id, NOME_USUARIO, DEPARTAMENTO, CPF, EMAIL, TIPO_USUARIO, SENHA }
        });
      }
    );
  });
}

export function deletarUsuario(req, res) {
  const id = parseInt(req.params.id);

  db.get((err, conn) => {
    if (err) return res.status(500).json({ error: err.message });

    const sql = "DELETE FROM USUARIOS WHERE ID_USUARIOS = ?";

    conn.query(sql, [id], (err2) => {
      conn.detach();
      if (err2) return res.status(500).json({ error: err2.message });

      res.status(200).json({
        message: `Usuário com ID ${id} deletado com sucesso.`,
      });
    });
  });
}