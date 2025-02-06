const { Router } = require("express")

const quizController = require("../controllers/quiz")
const authenticator = require("../middleware/authenticator");

const quizRouter = Router()

quizRouter.get("/", authenticator, quizController.index)
// quizRouter.get("/", quizController.index)
quizRouter.get("/:id", authenticator, quizController.show)
quizRouter.post("/", quizController.create)
// quizRouter.patch("/:id", quizController.update)
// quizRouter.delete("/:id", quizController.destroy)

module.exports = quizRouter