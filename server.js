const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//tells Mongoose which db to connect to (ie Heroku; else, will be to local route)
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://localhost:27017/pizza-hunt-for-pizza-lovers"
  //these are deprecated from as of Mongoose 6 release, and act as this normally
  , {
      userNewUrlParser: true,
      useUnifiedTopology: true
  }
);
//Use this to log mono queries being executed!
mongoose.set("debug", true);

app.use(require("./routes"));

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
