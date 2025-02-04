const UserResponse = require("../models/UserResponse");

async function show(req, res) {
    try {
      const id = req.params.id;
      // console.log("here is value of id in show controller: " + id)
      const diaries = await UserResponse.getOneById(id);
      res.status(200).json(diaries);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
}

module.exports = {
    show
}