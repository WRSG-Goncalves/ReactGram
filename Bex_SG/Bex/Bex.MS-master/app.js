import sql from 'mssql';
import express from 'express';
import userAgent from 'express-useragent';
import bodyParser from 'body-parser';
import cors from 'cors';
import mailer from 'nodemailer';
import ProcedureController from './controllers/App/ProcedureController'

//HELPER
import controller from './controllers';

module.exports.App = function (con, mail) {
    var self = this;

    self.con = con;
    self.mail = mail;

    const app = express();
    
    app.use(bodyParser.json());
    app.use(cors());
    app.use(userAgent.express());

    const controller = new ProcedureController();
    controller.register(con, mail)

    app.get('/versao-app', (req, res) => res.send({ version: "1.0.0" }))

    app.post('/processos', controller.processos.bind(this))
    app.post('/agc-iniciar-representacao', controller.agcIniciarRepresentacao.bind(this))
    app.post('/iniciar-representacao', controller.iniciarRepresentacao.bind(this))
    app.post('/agc-iniciar-votacao', controller.agcIniciarVotacao.bind(this))
    app.post('/iniciar-votacao', controller.iniciarVotacao.bind(this))
    app.post('/agc-comprovante-app', controller.agcComprovanteApp.bind(this))
    app.post('/representacao-credor-usuario', controller.representacaoCredorUsuario.bind(this))
    app.post('/enviar-comprovante-email', controller.enviarComprovanteEmail.bind(this))
    app.post('/check-comprovante-email', controller.checkComprovanteEmail.bind(this))
    app.post('/agc-votacao-atual', controller.agcVotacaoAtual.bind(this))

    app.post('/request-reset-senha', controller.requestResetSenha.bind(this))
    app.post('/alterar-senha', controller.alterarSenha.bind(this))
    app.get('/alterar-senha-app', controller.alterarSenhaApp.bind(this))
       
    self.start = function(port) {
        app.listen(port)
        console.log(`SERVIDOR RODANDO EM http://localhost:${port}`);
    }
}

module.exports.DB = function() {
    var self = this;
    self.connect = function(cb) {
        try {
            const connection = new sql.ConnectionPool({
                "user": process.env.DB_USER,
                "password": process.env.DB_PASSWORD,
                "database": process.env.DB_DATABASE,
                "server": process.env.DB_SERVER,
                "options": {
                    "enableArithAbort": false
                }
            });
            connection.connect(() => cb(connection));
        } catch (err) {
            console.log('err', err)
            cb(null);
        }
    }
}

module.exports.Mail = function() {
    var self = this;
    self.connect = function(cb) {
        try {
            const transporter = mailer.createTransport({
                port: process.env.MAIL_PORT,
                host: process.env.MAIL_HOST,
                    auth: {
                        user: process.env.MAIL_USERNAME,
                        pass: process.env.MAIL_PASSWORD,
                        },
                secure: true,
            });
            transporter
                .verify()
                .then((verify) => {
                    if (!verify) {
                        console.log('Erro ao iniciar serviço de email.')
                        cb({})
                    }
                    console.log('Serviço de email iniciado com sucesso.')
                    cb(transporter)
                })
                .catch(err => {
                    console.log('Erro ao iniciar serviço de email.', err)
                    cb({})
                });
        } catch (e) {
            console.log('Erro ao iniciar serviço de email.2', e)
            cb({})
        }
    }
}