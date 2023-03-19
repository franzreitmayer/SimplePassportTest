import passport from 'passport';
import expressSession from 'express-session';
import LocalStrategy from 'passport-local';

export default function (app) {
    console.log("setting up authentication...");
    passport.serializeUser((user, done) => { done(null, user.username) });
    passport.deserializeUser((id, done) => {
        const user = {
            username: 'admin',
            firstname: "Admin firstname",
            lastname: "Admin lastname"
        };
        done(null, user);
    });


    passport.use(
        new LocalStrategy((username, password, done) => {
            console.log(`Processing local strategy... ...username ${username}, password ${password}`);
            if (username === 'admin' && password === 'admin#') {
                done(
                    null, {
                    username: 'admin',
                    firstname: 'Admin firstname',
                    lastname: 'Admin lastname'
                }
                );
            } else {
                done('Not allowed');
            }
        })
    );

    app.use(expressSession({
        secret: 'top secrect',
        resave: false,
        saveUninitialized: false
    }));

    
    app.use(passport.initialize());
    app.use(passport.session());



    console.log("setting up /login...");
    app.post(
        '/login',
        passport.authenticate('local', { failureRedirect: '/static/login.html' }),
        (req, res) => {
            console.log(res);
            res.redirect('/service');
        }
    );

}