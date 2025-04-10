require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((e) => {
    console.log("failed to connect to DB ", e);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
