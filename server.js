require("dotenv").config();
const express = require("express");
const path = require("path");
const pgp = require("pg-promise")();

// Environmental values
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;

// Instantiate Express and Postgres
const app = express();
const db = pgp(DB_URI);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));

// Routes
// GET /feedback - Get all feedback
app.get("/feedback", (req, res) => {
  db.any("select * from feedback order by id desc")
    .then((rows) => {
      res.status(200).json(rows);
    })
    .catch((error) => res.status(400).json({ error }));
});

// POST /feedback - Post a feedback, respond with the JSON of the submitted feedback
app.post("/feedback", (req, res) => {
  const { feeling, understanding, support, comments } = req.body;
  db.none(
    "INSERT INTO feedback(feeling, understanding, support, comments) VALUES($1, $2, $3, $4)",
    [feeling, understanding, support, comments]
  )
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((error) => res.status(400).json({ error }));
});

// DELETE /feedback/:id - Delete a feedback, respond with the id of the deleted row
app.delete("/feedback/:id", (req, res) => {
  const id = req.params.id;
  db.none("DELETE FROM feedback WHERE id = $1", [id])
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((error) => res.status(400).json({ error }));
});

// PUT /feedback/:id - Toggle the flag of item with given id
app.put("/feedback/:id", (req, res) => {
  const id = req.params.id;
  // https://stackoverflow.com/questions/24218364/how-to-toggle-a-boolean-in-postgres-in-one-query
  db.none("UPDATE feedback SET flagged = NOT flagged WHERE id = $1", [id])
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((error) => res.status(400).json({ error }));
});

// https://coursework.vschool.io/deploying-mern-with-heroku/
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
