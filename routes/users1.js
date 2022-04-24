const express = require("express");
const router = express.Router();
// const homeControllers = require("./homeControllers");
const homeController1 = require("./homeController1")

router.get("/", homeController1.redirect);

router.get("/home", homeController1.indexView);
router.get("/users/home", homeController1.getIndex, homeController1.indexView2);

router.get("/new", homeController1.getNew);
router.post("/new", homeController1.saveProduct);

router.get("/search", homeController1.searchView);
router.get('/searchProduct', homeController1.findProduct);

router.get("/edit/:id", homeController1.getEdit);
router.put("/edit/:id", homeController1.updateProduct);

router.delete("/delete/:id", homeController1.deleteProduct);

router.get("/signUp", homeController1.getSignUp);
router.post("/signUp/createUser", homeController1.saveUser)

router.get("/login", homeController1.getLogin);
router.post("/login", homeController1.authenticate2)

router.get('/logout', homeController1.isAuthenticatedUser, (req, res)=> {
    req.logOut() ;
})

module.exports = router;