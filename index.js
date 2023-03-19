import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import auth from './auth.js';
import { ensureLoggedIn } from 'connect-ensure-login';
const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// app.use(session({cookie: {maxAge: 6000}}));



auth(app);


app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static(join(__dirname, "static")));
app.use("/service", ensureLoggedIn('/static/login.html'), 
    (req, res) => {
        res.send("Hello World");
    }
);
app.listen(8080);