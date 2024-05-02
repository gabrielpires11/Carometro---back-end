const { where } = require('sequelize');
const Turmas = require('../models/turmas');

exports.getAll = async (req, res) => {
    const turmas = await Turmas.findAll();
    res.json(turmas)
};

exports.getById = async (req, res) => {
    // No router id é o que vem depois do usuario/
    const idDoParam = req.param.id;
    const turmasEncontrado = await Turmas.findOne({ where: { idTurmas: idDoParam } });
    res.json(turmasEncontrado)
};

exports.createTurmas = async (req, res) => {
    try {
        const turmasCadastrado = await Turmas.findOne({ where: { codigo: req.body.codigo } });
        // Verificação duplicidade do usuario cadastrado
        if (turmasCadastrado) {
            return res.send("Já existe uma turma cadastrada com esse código.")
        }
        const turmasCriado = await Turmas.create(req.body)
        console.log("turmasCriado", turmasCriado)
        return res.send("turma cadastrada com sucesso!!")
        // res.json(usuario)


    } catch (error) {
        console.error("Erro ao criar turma:", error);
        return res.status(500).send('Ocorreu um erro ao criar a turma')
    }
};

//Atualizando informações
exports.updateTurma = async (req, res) => {
    const codigoTurma = req.params.codigo;
    try {
        const turmaCadastrada = await Turmas.findOne({ where: {codigo: codigoTurma} });
        console.log("Aqui", turmaCadastrada)
        if (turmaCadastrada){
            delete req.body.codigo;

            const [numRowsUpdated] = await Turmas.update(req.body, {
                where: { codigo: codigoTurma}
            });

            if(numRowsUpdated > 0){
                constturmaAtualizada = await Turmas.findOne({ where: {
                codigo: codigoTurma }});
                return res.send({ message: 'Turma Atualizada com sucesso', turmacomdadosnovos: turmaAtualizada});
            }
        }

    } catch (error){

    }
};

