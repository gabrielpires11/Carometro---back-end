const { where } = require('sequelize');
const Usuario = require('../models/usuario');
const UsuariosTurmas = require('../models/usuários_turma')

exports.getAll = async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios)
};

exports.getById = async (req, res) => {
    //no router id é o que vem depois do usuario/
    const idDoParam = req.params.id;
    const usuarioEncontrado = await Usuario.findOne({ idUsuarios: idDoParam });
    res.json(usuarioEncontrado)
};

//Criando um novo usuario
exports.createUsuario = async (req, res) => {
const usuarioCadastrado = await Usuario.findOne({ where: {cpf: req.body.cpf } });
    //verificação duplicidade de usuario cadastrado
    if (usuarioCadastrado) {
        return res.send('Já existe um usuario cadastrado neste CPF.')
    }

    const usuarioCriado = await Usuario.create(req.body)

    if (usuarioCriado.idUsuarios && req.body.Turmas_idTurmas) {

        await UsuariosTurmas.create({

            Turmas_idTurmas: req.body.idTurma, //idturma vem do front commo informação de seleção de turma
            Usuarios_idUsuarios: usuarioCriado.idUsuarios
            
        })
    }
    console.log("usuarioCriado", usuarioCriado)
    return res.send("oi")
    // res.json(usuarios)
};

//Atualizando informações
exports.updateUsuario = async (req, res) => {
    const cpfUsuario = req.params.cpf;
    try {
        const UsuarioCadastrada = await Usuario.findOne({ where: {cpf: cpfUsuario} });
        console.log("Aqui", UsuarioCadastrada)
        if (UsuarioCadastrada){
            //bloqueia as informações que não pode tirar
            delete req.body.cpf

            const [numRowsUpdated] = await Usuario.update(req.body, {
                where: {cpf: cpfUsuario}
            });

            if(numRowsUpdated > 0){
                const UsuarioAtualizado = await Usuario.findOne({ where: {
                cpf: cpfUsuario }});
                return res.send({ message: 'Usuário Atualizada com sucesso', usuariocomdadosnovos: UsuarioAtualizado});
            }

            else{
                return res.send('Usuário encontrado, porem sem novos dados para atualizar')
            }
        }
        else{
            return res.status(404).send('Não existe uma turma cadastrada com este código.')
        }

    } catch (error){
        console.error("Erro ao atualizar usuario:", error);
        return res.status(500).send('Ocorreu um erro ao atualizar usuario.');
    }

};

//deletar o usuário

exports.deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }

        const desvincular = await UsuariosTurmas.findOne({ where: {Usuarios_idUsuarios: usuario.idUsuarios } });
        if (desvincular) {
            await desvincular.destroy();
        }
        await usuario.destroy();

        return res.send('Usuário deletado com sucesso');
    } catch (error) {
        console.error("Erro ao deletar usuario:", error);
        return res.status(500).send('Ocorreu um erro ao deletar usuario');
    }
};


