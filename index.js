const express = require('express');
var flash = require('connect-flash');
const path = require('path');
const { ensureLoggedIn } = require('connect-ensure-login');
const auth = require("./auth");
var cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
app.use(cookieParser('secret'));

/*
app.use(function() {
    app.use(express.cookieParser('keyboard cat'));
    app.use(express.session({ cookie: { maxAge: 60000 }}));
    app.use(flash());
  });
*/

app.use(session({cookie: {maxAge: 6000}}));
app.use(flash());

app.get('/flash', function(req, res){
    req.flash('info', 'Flash is back!')
    res.redirect('/');
  });


auth(app);



app.use("/static", express.static(path.join(__dirname, "static")));
app.use("/service", ensureLoggedIn('/static/login.html'), 
    (req, res) => {
        res.send("Hello World");
    }
);
app.listen(8080);