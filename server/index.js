require("dotenv").config()
// const cors = require("cors");

const app = require("./app")

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
// app.use(cors()); // Allow frontend requests from different origins