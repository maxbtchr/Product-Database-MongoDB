const express = require("express");
const router = express.Router();
const homeControllers = require("./homeControllers");

router.get("/", homeControllers.redirect);
router.get("/home", homeControllers.getIndex);
router.get("/new", homeControllers.getNew);
router.post("/new", homeControllers.saveProduct);
router.get("/search", homeControllers.getSearch);
router.get('/searchProduct', homeControllers.findProduct);
router.get("/login", homeControllers.getLogin);
router.get("/signUp", homeControllers.getSignUp);
router.get("/edit/:id", homeControllers.getEdit);
router.put("/edit/:id", homeControllers.updateProduct);
router.delete("/delete/:id", homeControllers.deleteProduct);

module.exports = router;