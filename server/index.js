const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const router = require("./routes/routes");
const multer = require("multer");
const cookieParser = require("cookie-parser");

//init dotenv file
dotenv.config();

//setting the cookies to use it in our project
app.use(cookieParser());
const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"],
};

//init express
app.use(cors(corsOption));
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

//storage for uploading file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });

//upload file route
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json({ message: "file has been uploaded." });
});
//init routes
app.use("/api", router);

app.listen("5000", () => {
  console.log("Running on Port");
});
