const UserResponse = require("../models/UserResponse");

async function index() {
  try {
    const responses = await UserResponse.getAll();
    res.status(200).json(responses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

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
async function create(req, res) {
  console.log("hit controller create");
  try {
    const data = req.body;
    const newScore = await UserResponse.create(data);
    res.status(201).json(newScore);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


module.exports = {
  index,
  show,
  create,
};
