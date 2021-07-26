require('dotenv-safe').config()
const express = require("express")
const router = express.Router()
const controller = require("../controllers/letterController")

router.get("/", controller.getAll)
router.post("/", controller.postLetter)
router.delete("/:id", controller.deleteLetter)
router.put("/:id", controller.putLetters)

module.exports = router