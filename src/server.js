import app from "./app.js";

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
