const express = require("express");
const router = express.Router();
const homeControllers = require("./homeControllers")

router.get("/", homeControllers.redirect);

router.get("/home", homeControllers.getHeader, homeControllers.getIndex, homeControllers.indexView);

router.get("/new", homeControllers.getHeader, homeControllers.getNew);
router.post("/new", homeControllers.saveProduct);

router.get("/search", homeControllers.getHeader, homeControllers.searchView);
router.get('/searchProduct', homeControllers.getHeader, homeControllers.findProduct);

router.get("/edit/:id", homeControllers.getHeader, homeControllers.getEdit);
router.put("/edit/:id", homeControllers.updateProduct);

router.delete("/delete/:id", homeControllers.deleteProduct);

router.get("/signUp", homeControllers.getSignUp);
router.post("/signUp/createUser", homeControllers.saveUser);

router.get("/login", homeControllers.getLogin);
router.post("/login", homeControllers.authenticate);

router.get('/logout', homeControllers.isAuthenticatedUser, homeControllers.logout);

module.exports = router;