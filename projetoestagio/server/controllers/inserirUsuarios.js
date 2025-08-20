import db from "../database.js";

export function inserirUsuario(dados, callback) {
  db.get((err, conn) => {
    if (err) return callback(err);
    
    const sql = `
      INSERT INTO USUARIOS (NOME_USUARIO, CPF, EMAIL, TIPO_USUARIO, SENHA) 
      VALUES (?, ?, ?, ?, ?)
    `;
    conn.query(sql, dados, (err2) => {
      conn.detach();
      callback(err2);
    });
  });
}