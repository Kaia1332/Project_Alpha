const { Router } = require("express")

const userResponseController = require("../controllers/user_response")

const userResponseRouter = Router()

userResponseRouter.get("/", userResponseController.index)
userResponseRouter.get("/:id", userResponseController.show)
userResponseRouter.post("/", userResponseController.create)

module.exports = userResponseRouter