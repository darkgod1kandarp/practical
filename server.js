const express = require("express");
const Sequelize = require("sequelize");

const employee = require("./models/employee");
const path = require("path");
const multer = require("multer");
const insertData  =  require("./routes/insertData")
const employeeId =  require("./routes/employeeId")
const managerEmployee =  require("./routes/managerEmployee")

//Sequelize connection 
const sequelize = new Sequelize("practical", "root", "123456", {
  host: "127.0.0.1",
  dialect: "mysql",
});

//Storing the file  in the backend
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Uploads is the Upload_folder_name
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

// Define the maximum size for uploading
const maxSize = 1 * 1000 * 1000;


//Uploading function for storing file
var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    // Set the filetypes, it is optional
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(
      "Error: File upload only supports the " +
        "following filetypes - " +
        filetypes
    );
  },

  // mypic is the name of file attribute
}).single("file");


app = express();
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const employeeTable = employee(sequelize);

app.post("/data/employe", async (req, res) =>insertData(req , res, sequelize, employeeTable) );

app.post("/id/employee", async (req, res) => employeeId(req, res , sequelize, employeeTable));

app.post("/manager/employee", async (req, res) => managerEmployee(req, res, sequelize, employeeTable));

app.post("/upload/files", async (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send("Success, Image uploaded!");
    }
  });

});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
