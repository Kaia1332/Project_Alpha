const express = require("express")
const cors = require("cors")

const logger = require("./middleware/logger")
const quizRouter = require("./routers/quiz")
const userRouter = require('./routers/user');
const userResponseRouter = require("./routers/user_response")

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
app.use("/user_response",userResponseRouter)

module.exports = app