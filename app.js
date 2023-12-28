const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors');

// Load environment variables. See .env file for available variables.
// This should be done before loading variables from process.env
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

/* 
Morgan configuration that logs the following:
- the request body
- the request params
- the request query
- the time of the request
- the user agent
*/
const morganConfig = morgan(function (tokens, req, res) {
  return [
    JSON.stringify(req.body),
    JSON.stringify(req.params),
    JSON.stringify(req.query),
    tokens.date(req, res, "iso"),
    req.headers["user-agent"],
  ].join(" ");
});

// Middlewares
app.use(express.json());
app.use(morganConfig);
app.use(cors()); //moiddleware

const sequelize = require("./config/db.config");

// Define routes here
const usersRoutes = require("./routes/users.routes.js")
const teamsRoutes = require("./routes/teams.routes.js")
const scoresRoutes = require("./routes/scores.routes.js")
const regionRoutes = require("./routes/region.routes.js")
const leaderboardRoutes = require("./routes/leaderboard.routes.js")
const gamesRoutes = require("./routes/games.routes.js")
const authRoutes = require("./routes/auth.routes.js")

app.use("/users", usersRoutes)
app.use("/teams", teamsRoutes)

// TODO: Rename /replies into /tweets. Because they are part of tweets.
app.use("/scores", scoresRoutes)

// TODO: Rename /likes into /tweets. Because they are part of tweets.
app.use("/region", regionRoutes)

// TODO: Rename /follow into /users. Because followers and followings are part of users
// app.use("/users", followRoutes)

app.use("/leaderboard", leaderboardRoutes)

app.use("/games", gamesRoutes)

app.use("/auth", authRoutes)

// Health
app.get("/", (req, res) => {
  res.send("Ok: " + process.env.NODE_ENV);
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    console.log(`🚀 Server running on port ${port}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
