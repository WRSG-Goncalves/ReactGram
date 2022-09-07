var App = require(__dirname + '/app.js');
import dotenv from 'dotenv';

let port = process.env.PORT || 3000;

dotenv.config();

const db = new App.DB();
db.connect(con => {
    if (con?.connected) {
        const mail = new App.Mail();
        mail.connect(mailer => {
            if (mailer) {
                const app = new App.App(con, mailer);
                app.start(port);
            }
        })
    } else {
        console.log('Erro ao carregar conexão com banco.')
    }
});