//models/usuarios_turmas.js
const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const Turmas = require('./turmas');
const UsuariosTurmas = sequelize.define('usuarios_turmas', {
    //define as informações da tabela colunas

    Turmas_idTurmas: {
        type: Sequelize.INTEGER,
        primaryKey: false // Indica que não é uma chave primária
    },
    Usuarios_idUsuarios: {
        type: Sequelize.INTEGER,
        primaryKey: false // Indica que não é uma chave primária
    },

},
    {//precisa disso pq nao tem as colunas createdAt e uptedAt no bd
        timestamps: false // Adiciona colunas createdAt e updatedAt automaticamente

    });
UsuariosTurmas.removeAttribute("id")
module.exports = UsuariosTurmas;