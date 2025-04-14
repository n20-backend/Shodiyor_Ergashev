import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import database from "./config/database/db.js";

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    await database.authenticate();
    await database
      .sync()
      .then(console.log("Database sync"))
      .catch((err) => console.log("Error is here", err));
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
