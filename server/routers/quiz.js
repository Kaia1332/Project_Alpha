const { Router } = require("express")

const quizController = require("../controllers/quiz")

const quizRouter = Router()

quizRouter.get("/", quizController.index)
quizRouter.get("/:id", quizController.show)
quizRouter.post("/", quizController.create)
quizRouter.patch("/:id", quizController.update)
quizRouter.delete("/:id", quizController.destroy)

module.exports = quizRouter