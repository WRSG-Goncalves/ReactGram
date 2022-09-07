import pdf from 'html-pdf'
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import passwordHasher from 'aspnet-identity-pw';

export default class ProcedureController {
    constructor() {
        this.register = this.register.bind(this)
    }

    register(con, mail) {
        this.con = con;
        this.mail = mail;
    }

    async processos(req, res) {
        var self = this;
        const { body: { userId }} = req;
        try {
            const result = await self.con.query`[Proc_Sel_Processo_Recuperanda_APP] ${userId}`;
            return res.send(result);
        } catch (e) {
            console.log(e)
            return res.status(500).send({error: true, message: e?.originalError?.message || 'Erro ao listar processos.'})
        }
    }

    async agcIniciarRepresentacao(req, res) {
        var self = this;
        const { body: { assemblyId, userId }} = req;
        try {
            const result = await self.con.query`[Proc_Sel_AGC_IniciarRepresentacao_APP] ${assemblyId}, ${userId}`;
            return res.send(result);
        } catch (e) {
            return res.status(500).send({error: true, message: e?.originalError?.message || 'Erro ao iniciar representação AGC.' })
        }
    }

    async iniciarRepresentacao(req, res) {
        var self = this;
        const { body: { ids, userId }} = req;
        try {
            const result = await self.con.query`[Proc_Iniciar_Representacao] ${ids}, ${userId}`;
            return res.send(result);
        } catch (e) {
            return res.status(500).send({error: true, message: e?.originalError?.message || 'Erro ao iniciar representação.' })
        }
    }

    async agcIniciarVotacao(req, res) {
        var self = this;
        const { body: { assemblyId, userId }} = req;
        try {
            const result = await self.con.query`[Proc_Sel_AGC_IniciarVotacao] ${assemblyId}, ${userId}`;
            return res.send(result);
        } catch (e) {
            return res.status(500).send({error: true, message: e?.originalError?.message || 'Erro ao iniciar votação AGC.' })
        }
    }

    async iniciarVotacao(req, res) {
        var self = this;
        try {
            const { body: { query }} = req;
            const result = await self.con.query`[Proc_Iniciar_Votacao] ${query}`;
            return res.send(result);
        } catch (e) {
            return res.status(500).send({error: true, message: e?.originalError?.message || 'Erro ao iniciar votação.' })
        }
    }

    async agcComprovanteApp(req, res) {
        var self = this;
        const { body: { assemblyId, userId }} = req;
        try {
            const result = await self.con.query`[Proc_Sel_AGC_Comprovante_APP] ${assemblyId}, ${userId}`;
            return res.send(result);
        } catch (e) {
            return res.status(500).send({error: true, message: e?.originalError?.message || 'Erro ao iniciar comprovante app.' })
        }
    }

    async representacaoCredorUsuario(req, res) {
        var self = this;
        const { body: { processId, userId }} = req;
        try {
            const result = await self.con.query`[Proc_Sel_RepresentacaoCredorPorUsuario] ${processId}, ${userId}`;
            return res.send(result);
        } catch (e) {
            return res.status(500).send({error: true, message: e?.originalError?.message || 'Erro ao iniciar credor por usuário.' })
        }
    }

    async enviarComprovanteEmail(req, res) {
        var self = this;
        const { body: { assemblyId, userId, email: newEmail, voto }} = req;
        try {
            const { recordset: select } = await self.con.query`SELECT * FROM ComprovanteEmail WHERE AspNetUserId = ${userId} AND AssemblyId = ${assemblyId} AND Voto = ${voto}`;
            if (!select?.length) {
                const { recordset: votacaoAtualRecord } = await self.con.query`[Proc_Sel_AGC_VotacaoAtual] ${assemblyId}`;

                const votacaoAtual = votacaoAtualRecord?.[0]?.VotacaoAtual
                const votacaoAtualTexto = votacaoAtualRecord?.[0]?.TextoVotacao

                if (voto > votacaoAtual) {
                    return res.sendStatus(400);
                }

                const votoNumber = voto || 1;

                const { recordset: comprovantes } = await self.con.query`[Proc_Sel_AGC_Comprovante_APP] ${assemblyId}, ${userId}`;

                const { recordset: oldEmail} = await self.con.query`SELECT * FROM AspNetUsers WHERE Id = ${userId}`;

                const email = newEmail || oldEmail?.[0]?.Email;
                const name = oldEmail?.[0]?.NomeCompleto;
                
                if (newEmail) {
                    await self.con.query`UPDATE AspNetUsers SET Email = ${newEmail} WHERE Id = ${userId}`;
                }

                let tableLines = ''
                comprovantes?.map(item => 
                    tableLines = tableLines.concat(`<tr style="width:100%">
                    <td style="border: 1px solid gray;padding-top: 10px;font-size: 10px;width: 16.66%">${item?.Credor}</td>
                    <td style="border: 1px solid gray;padding-top: 10px;font-size: 10px;width: 16.66%">${item?.Classe}</td>
                    <td style="border: 1px solid gray;padding-top: 10px;font-size: 10px;width: 16.66%">${item?.Valor ? parseFloat(item?.Valor)?.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }) : '---'}</td>
                    <td style="border: 1px solid gray;padding-top: 10px;font-size: 10px;width: 16.66%">${item?.Representante}</td>
                    <td style="border: 1px solid gray;padding-top: 10px;font-size: 10px;width: 16.66%">${item?.[`Voto${voto}`] || '---'}</td>
                    <td style="border: 1px solid gray;padding-top: 10px;font-size: 10px;width: 16.66%">${item?.[`DataVoto${voto}`] ? 
                        `${dayjs(item?.[`DataVoto${voto}`]).format('DD/MM/YYYY HH:mm:ss')}`
                            : '---'}</td>
                    </tr>`)
                )

                const html =`<div style="width:100%"><table style="width:100%;border-collapse: collapse;">
                <tr style="width:100%">
                    <td style="background-color: #ECECEC;border: 1px solid gray;font-size: 10px;width: 16.66%">Credor</td>
                    <td style="background-color: #ECECEC;border: 1px solid gray;font-size: 10px;width: 16.66%">Classe</td>
                    <td style="background-color: #ECECEC;border: 1px solid gray;font-size: 10px;width: 16.66%">Valor</td>
                    <td style="background-color: #ECECEC;border: 1px solid gray;font-size: 10px;width: 16.66%">Representante</td>
                    <td style="background-color: #ECECEC;border: 1px solid gray;font-size: 10px;width: 16.66%">${votoNumber}ª Votação</td>
                    <td style="background-color: #ECECEC;border: 1px solid gray;font-size: 10px;width: 16.66%">Data ${votoNumber}ª Votação</td>
                </tr>
                ${tableLines}
                </table></div>`

                let bufferPdf = null

                var options = { 
                    format: 'A4',
                    header: {
                        height: "15mm",
                        contents: `<div style="-webkit-transform: rotate(331deg);-moz-transform: rotate(331deg);-o-transform: rotate(331deg);transform: rotate(331deg);font-size: 12em;color: rgba(221, 221, 221, 0.6);position: absolute;font-family: 'Denk One', sans-serif;text-transform:uppercase;position: absolute; top: 300px; left: 180px; right: 0; bottom: 0;"><span style="font-size: 85px;">BEX</span></div><div><div style="margin:0;padding:0;list-style-type: none;display: table;table-layout: fixed;width: 100%; padding: 5px 20px 5px 20px; text-align: center;font-size: 10px;"><div style="display: table-cell;text-align: center;vertical-align: middle;"><span>${votacaoAtualTexto}</span></div><div style="display: table-cell;text-align: center;vertical-align: middle;"><span style="font-size: 10px">Página {{page}}</span> de <span style="font-size: 10px">{{pages}}</span></div></div><hr></div>`
                    },
                    footer: {
                        height: "15mm"
                    },
                };
                
                const promi = new Promise((resolve, reject) => {
                    pdf.create(html, options).toBuffer((err, buffer) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(buffer);
                    }
                    });
                });
                
                bufferPdf = await promi

                const mailData = {
                    from: process.env.MAIL_USERNAME,
                    to: email,
                    subject: 'Comprovante de Votação AGC',
                    html: `<div style="margin: 0;padding: 0;">
                                <div style="background-color: #002568;padding: 20px;margin: 20px 0 0 0;">
                                    <h1 style="color: white;margin: 0;padding: 0;font-size: 20px;">Portal Brasil Expert</h1>
                                </div>
                                <h2 style="padding-left: 20px;font-size: 16px;">
                                    Olá, ${name}.
                                </h2>
                                <h3 style="border-bottom: 1px solid black;margin: 50px 20px 0 20px;text-align: center;font-size: 14px;">
                                    Usuário: ${email}
                                </h3>
                                <h3 style="margin: 0 20px 0 20px;text-align: center;font-size: 16px;">
                                    Comprovante de Votação AGC Virtual - Empresa XPTO - Homologação em ${dayjs().format('DD/MM/YYYY')}
                                </h3>
                            </div>`,
                    attachments:[
                        {   
                            filename: 'ComprovanteVotacao.pdf',
                            content: bufferPdf,
                            contentType: 'application/pdf'
                        },
                    ]
                };

                const sended = await self.mail.sendMail(mailData);
                if (!sended?.accepted?.length) {
                    return res.sendStatus(500);
                }

                await self.con.query`INSERT INTO ComprovanteEmail (AspNetUserId, AssemblyId, Email, Voto) VALUES (${userId}, ${assemblyId}, ${email}, ${voto})`;
                
                return res.sendStatus(200);
            } else {
                return res.sendStatus(400);
            }
        } catch (e) {
            console.log(e)
            console.log(JSON.stringify(e))
            return res.status(500).send({error: true, message: e?.originalError?.message || 'Erro ao enviar comprovante via email.' })
        }
    }

    async checkComprovanteEmail(req, res) {
        var self = this;
        const { body: { email, userId, assemblyId }} = req;
        try {
            const result = await self.con.query`SELECT * FROM ComprovanteEmail WHERE Email = ${email} AND AssemblyId = ${assemblyId} AND AspNetUserId = ${userId}`;
            return res.send(result);
        } catch (e) {
            return res.status(500).send({error: true, message: e?.originalError?.message || 'Erro ao iniciar credor por usuário.' })
        }
    }

    async agcVotacaoAtual(req, res) {
        var self = this;
        const { body: { assemblyId }} = req;
        try {
            const result = await self.con.query`[Proc_Sel_AGC_VotacaoAtual] ${assemblyId}`;
            return res.send(result);
        } catch (e) {
            return res.status(500).send({error: true, message: e?.originalError?.message || 'Erro ao iniciar votação atual.' })
        }
    }

    async deleteResetSenha(con, userId) {
        await con.query`DELETE FROM ResetSenha WHERE UserId = ${userId}`;
    }

    async generateNewCode(con, userId) {
        await deleteResetSenha(con, userId);

        const code = uuidv4()
        const { recordset: select } = await con.query`SELECT * FROM ResetSenha WHERE Codigo = ${code}`;
        if (select?.length) {
            return generateNewCode(con, userId);
        }
        await con.query`INSERT INTO ResetSenha (UserId, Codigo, ExpiraEm) VALUES (${userId}, ${code}, ${dayjs().add(1, 'hour').toDate()})`;
        return code;
    }

    getHost() {
        return 'https://bex-ms.azurewebsites.net'
    }

    async requestResetSenha(req, res) {
        var self = this;

        const { body: { userName }} = req;
        try {
            const { recordset } = await self.con.query`SELECT * FROM AspNetUsers WHERE UserName = ${userName}`;

            if (!recordset?.length) {
                return res.sendStatus(404);
            }

            const { Id, Email, NomeCompleto } = recordset?.[0]

            // const { recordset: select } = await self.con.query`SELECT * FROM ResetSenha WHERE UserId = ${Id} ORDER BY id DESC`;

            const code = await generateNewCode(self.con, Id);

            const mailData = {
                to: Email,
                subject: 'Restaurar Senha',
                html: `<div style="margin: 0;padding: 0;">
                            <div style="background-color: #002568;padding: 20px;margin: 20px 0 0 0;">
                                <h1 style="color: white;margin: 0;padding: 0;font-size: 20px;">Portal Brasil Expert</h1>
                            </div>
                            <h2 style="padding-left: 20px;font-size: 16px;">
                                Olá, ${NomeCompleto}.
                            </h2>
                            <h3 style="margin: 0 20px 0 20px;text-align: center;font-size: 16px;">
                                Atenção: Para restaurar a sua senha clique <a href="${getHost()}/alterar-senha-app?uid=${Id}&code=${code}">aqui</a>
                            </h3>
                        </div>`,
            };

            const sended = await self.mail.sendMail(mailData);
            if (!sended?.accepted?.length) {
                return res.sendStatus(500);
            }

            return res.sendStatus(200);
        } catch (e) {
            console.log(e)
            return res.status(500).send({error: true, message: e?.originalError?.message || 'Erro ao criar código.' })
        }
    }

    async alterarSenha(req, res) {
        var self = this;
        const { body: { userId, codigo, senha }} = req;
        try {
            const {recordset: select} = await self.con.query`SELECT * FROM ResetSenha WHERE UserId = ${userId} AND Codigo = ${codigo} AND ExpiraEm > ${dayjs().toDate()}`;

            if (select?.length) {
                const newPassword = passwordHasher.hashPassword(senha);
                const updateResult = await self.con.query(`UPDATE AspNetUsers SET PasswordHash = '${newPassword}' WHERE Id = '${userId}'`);

                if (updateResult?.rowsAffected?.length) {
                    await deleteResetSenha(self.con, userId);
                    return res.sendStatus(200);
                } 
            } else {
                return res.sendStatus(404);
            }
            return res.sendStatus(400);
        } catch (e) {
            return res.status(500).send({error: true, message: e?.originalError?.message || 'Erro ao criar código.' })
        }
    }

    async alterarSenhaApp(req, res) {
        const { query } = req;
        try {
            if (query?.uid && query?.code) {
                const { uid, code } = query;
                return res.redirect(`bex://password-reset/${uid}/${code}`);
            }
            return res.sendStatus(400);
        } catch (e) {
            return res.status(500).send({error: true, message: e?.originalError?.message || 'Erro ao redirecionar.' })
        }
    }
}