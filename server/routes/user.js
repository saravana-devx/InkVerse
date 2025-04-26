const express = require("express");
const { signUp, login, editProfile } = require("../controllers/Auth");
const auth = require("../middlewares/Auth");
const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.put("/updateProfile", auth, editProfile);

module.exports = router;
