const express = require("express");
const app = express();
const mongoose = require("mongoose");
const body_parser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { ObjectId } = require("bson");

dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 5000;

//connect database and schemmaa
const db = process.env.DATABASE;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful!");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("DATAUSER", userSchema);

//middlewares
app.use(body_parser.json());
app.use(cors());

const userData = async (req, res) => {
  //console.log(req.body);

  try {
    const { name, email, mobile } = req.body;

    if (!name || !email || !mobile) {
      console.log("All Fields are required!");
      return;
    }

    const user = User({ name, email, mobile });

    await user.save();
    return res.json({ message: "MISSION SUCCESSFULL" });
  } catch (err) {
    console.log(err);
  }
};

const getData = (req, res) => {
  console.log("I am in");
  User.find((err, data) => {
    if (err) {
      console.log("Unable to fetch data");
    } else {
      res.send(data);
    }
  });
};

const updateData = (req, res) => {
  console.log(req.params.id);
  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
      },
    }
  )
    .then((result) => {
      res.status(200).json({ message: "data updated Successfully" });
    })
    .catch((err) => console.log(err));
};

const deleteData = (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ message: "deleted successfully" });
    })
    .catch((err) => console.log(err));
};

//routing

app.post("/profile", userData);
app.get("/profile", getData);
app.put("/profile/:id", updateData);
app.delete("/profile/:id", deleteData);

app.listen(port, (req, res) => {
  console.log(`server is start at port ${port}`);
});
