const Product = require("../model/product")


// home page
exports.getIndex = (req, res) => {
    Product.find({})
    .then(products => {
        res.render('index', {products: products});
    })
    .catch(error => {
        res.redirect('/');
    });
};


// redirect to homepage
exports.redirect = (req, res) => {
    res.redirect("home");
};


// edit page
exports.getNew = (req, res) => {
    res.render("new");
};


// add new product
exports.saveProduct = (req, res) => {
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
};


// search product page
exports.getSearch = (req, res) => {
    res.render("search", {products: undefined});
};


// find product function
exports.findProduct = (req, res) => {
    let searchQuery = {code: req.query.findCode};
    Product.findOne(searchQuery)
    .then(products => {
        console.log("Products:")
        console.log(products);
        if(products!==null){
            res.render('search', {products: products});
        }else{
            req.flash("error_msg", "Product does not exist in the database");
            res.redirect('/search');
        }
    })
    .catch(error => {
        req.flash("error_msg", "Cannot search product");
        res.redirect('/search');
    });
};


// edit product page
exports.getEdit = (req, res) => {
    let searchQuery = {_id: req.params.id};
    Product.findOne(searchQuery)
    .then(product => {
        res.render('edit', {product: product});
    })
    .catch(error => {
        res.redirect('/home');
    });
};


// edit product function
exports.updateProduct = (req, res) => {
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
};


// delete product function
exports.deleteProduct = (req, res)=>{
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
};