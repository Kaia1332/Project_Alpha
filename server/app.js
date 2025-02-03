const express = require("express")
const cors = require("cors")

const logger = require("./middleware/logger")
// const userRouter = require("./routers/users")
const quizRouter = require("./routers/quiz")
const userRouter = require('./routers/user');

const app = express()
app.use(express.json())
app.use(cors())
app.use(logger)

// landing page
app.get("/", (req, res) => {
    res.status(200).json({
      title: "Quiz",
      description: "Welcome to our quiz page"
    })
  })

app.use("/quiz", quizRouter)
app.use("/user", userRouter)

module.exports = app