import Joi from 'joi';

const schemaUsuario = Joi.object({
  NOME_USUARIO: Joi.string().min(3).required(),
  DEPARTAMENTO: Joi.string().required(),
  CPF: Joi.instrg().length(11).pattern(/^\d+$/).required(),
  EMAIL: Joi.string().email().required(),
  TIPO_USUARIO: Joi.string().required(),
  SENHA: Joi.string().min(6).required()
});

export default schemaUsuario;