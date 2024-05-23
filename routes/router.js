//routes/router.js
//nesse arquivo estarão todas as rotas
//no caso de um proj com muitas rotas é possível quebrar as rotas em mais arquivos
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario')
const turmasController = require('../controllers/turmas')

//retorna todos usuarios
router.get('/usuario', usuarioController.getAll)
router.get('/usuario/:id', usuarioController.getById)

//cria um usuario passando informações no body
router.post('/usuario', usuarioController.createUsuario)


//INSERIR OUTRAS ROTAS -->
router.get('/turmas', turmasController.getAll)
router.get('/turmas/:id', turmasController.getById) 
router.post('/turmas', turmasController.createTurmas)

//deletar os usuarios
router.delete('/usuario/:id', usuarioController.deleteUsuario)


router.put('/turmas/:codigo', turmasController.updateTurma);
router.put('/usuario/:cpf', usuarioController.updateUsuario)
/* router.get('/turmas', turmasController.getAll)
router.get('/turmas/:id', turmasController.getById) */

/* router.get('/usuario', usuarioController.listarUsarios) */

module.exports = router;