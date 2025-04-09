import dotenv from "dotenv";
const nodeEnv = process.env.NODE_ENV;
let envPath;
// if (nodeEnv === "dev") {
//   envPath = ".env.dev";
// } else if (nodeEnv === "prod") {
//   envPath = ".env.prod";
// }
dotenv.config({ path: `./${envPath}` });
import app from "./app.js";
import database from "./config/database/db.js";

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    await database.authenticate();
    await database
      .sync({
        // force: true,
      })
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
