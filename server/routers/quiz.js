const { Router } = require("express")

const quizController = require("../controllers/quiz")
const authenticator = require("../middleware/authenticator");

const quizRouter = Router()

quizRouter.get("/", authenticator, quizController.index)
quizRouter.get("/:id", authenticator, quizController.show)

module.exports = quizRouter