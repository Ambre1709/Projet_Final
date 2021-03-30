// MODULES
const express = require("express");
const router = express.Router();

// IMPORTATION USER CONTROLLERS
const userCtrl = require("../controllers/user");

// IMPORTATION MIDDLEWARES
const auth = require("../middleware/auth"); // Crée un token d'identification
const multer = require("../middleware/multer-config"); // Permet d'envoyer un fichier dans la requête

// ROUTE
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

router.delete("/deleteProfile", auth, userCtrl.deleteProfile);

//router.get("/:id/profile", auth, userCtrl.profile);

//.put("/modify", auth, multer, userCtrl.modify);

module.exports = router;