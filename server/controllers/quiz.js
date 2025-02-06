const Mcq = require("../models/mcq");

async function index(req, res) {
  try {
    // console.log("hello from index controller");
    const diaries = await Mcq.getAll();
    // console.log(diaries);
    res.status(200).json(diaries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function show(req, res) {
  try {
    const id = req.params.id;
    // console.log("here is value of id in show controller: " + id)
    const diaries = await Mcq.getOneById(id);
    res.status(200).json(diaries);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  index,
  show,
};
