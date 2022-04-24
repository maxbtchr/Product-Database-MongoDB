const express = require("express");
const router = express.Router();
const homeControllers = require("./homeControllers");
const homeController1 = require("./homeController1")

router.get("/", homeController1.redirect);
router.get("/home", homeController1.getIndex, homeController1.indexView);

router.get("/new", homeControllers.getNew);
router.post("/new", homeControllers.saveProduct);

router.get("/search", homeControllers.searchView);
router.get('/searchProduct', homeControllers.findProduct);

router.get("/edit/:id", homeControllers.getEdit);
router.put("/edit/:id", homeControllers.updateProduct);

router.delete("/delete/:id", homeControllers.deleteProduct);

router.get("/signUp", homeControllers.getSignUp);
router.post("/signUp/createUser", homeController1.saveUser, homeController1.redirect)

router.get("/login", homeControllers.getLogin);
router.post("/login", homeControllers.authenticate)


module.exports = router;