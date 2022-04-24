const express = require("express");
const connectFlash = require("connect-flash");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
// const userControllers = require("./routes/users");
const userController1 = require('./routes/users1');

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const expressSession = require("express-session");
const cookieParser = require("cookie-parser")
const path = require("path");




// utiliser process.env. pour aller chercher dans le document config.env 
dotenv.config({path: "./config.env"});


// analyser les données envoyées ou reçues de la database
mongoose.connect(process.env.DATABASE_LOCAL, {useNewUrlParser: true});
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// middlewares
app.use(methodOverride('_method'));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cookieParser("my_secret_code"));
app.use(expressSession({
    secret: "my_secret_code",
    cookie: {
        maxAge: 400000
    },
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const User = require('./model/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(connectFlash());

app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});

app.use(userController1);

const port = process.env.PORT || 4000;
app.listen(port, () => {console.log(`Le serveur tourne sur http://localhost:${port}.`)});