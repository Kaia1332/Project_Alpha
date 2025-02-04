const { Router } = require("express")

const userResponseController = require("../controllers/user_response")

const userResponseRouter = Router()

userResponseRouter.post("/", userResponseController.create)
userResponseRouter.get("/:id", userResponseController.show)


module.exports = quizRouter