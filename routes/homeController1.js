const Product = require("../model/product");
const User = require("../model/user");
const passport = require("passport");

module.exports = {

    // get Products
    getIndex : (req, res, next) => {
        Product.find({})
        .then(products => {
            res.locals.products = products;
            next();
        })
        .catch(error => {
            res.redirect('/');
        });
    },

    // render index
    indexView2 : (req, res)=>{
        res.render("index");
    },

    indexView : (req, res)=>{
        res.render("index", {products: undefined});
    },

    // redirect
    redirectView: (req, res)=>{
        const redirectPath = res.locals.redirect;
        if(redirectPath)
            res.redirect(redirectPath);
    },

    redirect: (req, res) => {
        res.redirect("/home");
    },


    // new product page
    getNew : (req, res) => {
        res.render("new");
    },


    // save new product post
    saveProduct : (req, res) => {
        console.log(req.body)
        code = req.body.code,
        description = req.body.description,
        price = req.body.price
    
        // créer le document avec les données
        let newProduct = new Product({code: code, description: description, price: price});
    
        // ajouter le document à la database
        newProduct.save()
        .then((address) => {
            req.flash("success_msg", "Product data added to database successfully");
            res.redirect("/home");
        })
        .catch((error) => {
            req.flash("error_msg", "Product data not added to database");
            res.redirect("/new");
        });
    },


    // get search page
    searchView : (req, res) => {
        res.render("search", {searchResults: undefined});
    },


    // search results
    findProduct : (req, res) => {
        let searchQuery = {code: req.query.findCode};
        Product.findOne(searchQuery)
        .then(searchResults => {
            console.log("Search results:")
            console.log(searchResults);
            if(searchResults!==null){
                res.render('search', {searchResults: searchResults});
            }else{
                req.flash("error_msg", "Product does not exist in the database");
                res.redirect('/search');
            }
        })
        .catch(error => {
            req.flash("error_msg", "Cannot search product");
            res.redirect('/search');
        });
    },


    // get edit page
    getEdit : (req, res) => {
        let searchQuery = {_id: req.params.id};
        Product.findOne(searchQuery)
        .then(product => {
            res.render('edit', {product: product});
        })
        .catch(error => {
            res.redirect('/home');
        });
    },


    // edit product function
    updateProduct : (req, res) => {
        let searchQuery = {_id: req.params.id};
        console.log(searchQuery)
        Product.updateOne(searchQuery, {$set: {
            code: req.body.code,
            description: req.body.description,
            price: req.body.price
        }})
        .then(success => {
            req.flash("success_msg", "Product data updates successful");
            res.redirect('/home');
        })
        .catch(error => {
            req.flash("error_msg", "Product data not updated");
            res.redirect('/home');
        });
    },


    // delete product function
    deleteProduct : (req, res)=>{
        let searchQuery = {_id: req.params.id};
        Product.deleteOne(searchQuery)
        .then(()=>{
            req.flash("success_msg", "Product deleted successfully");
            res.redirect("/home");
        })
        .catch(error=>{
            req.flash("error_msg", "Product not deleted");
            res.redirect("/home");
        });
    },


    // signup page
    getSignUp : (req, res) => {
        res.render("signUp");
    },


    // save new user
    saveUser: (req, res, next)=>{
        if (req.skip)
            next();

        let userParams = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
        };

        const newUser = new User(userParams);

        User.register(newUser, req.body.password, (error, user) => {
            if (error){
                console.log(error);
                next();
            } else {
                console.log('test:')
                res.render('login');
                next();
            }
        });
    },
    

    // get login page
    getLogin : (req, res) => {
        res.render("login");
    },


    // authenticate login
    authenticate2 : passport.authenticate("local", {
        failureRedirect: "/login",
        successRedirect: "/users/home"
    }),
    
    authenticate : (req, res, next)=>{
        User.findOne({email: req.body.email}).
        then(user=>{
    
            if(user.password == req.body.password){
                res.redirect('/home');
                res.locals.user = user;
                next();
            } else {
                res.redirect('/login');
                next();
            }
    
        })
        .catch(error=>{
            next(error);
        });
    },


    // logout
    isAuthenticatedUser : (req, res)=> {
        req.isAuthenticated() ;
        res.redirect('/login');
    }
};