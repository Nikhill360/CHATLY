const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads");
  },
  filename: function (req, file, cb) {
    const fn = crypto.randomBytes(16).toString("hex") + path.extname(file.originalname);
    cb(null, fn);
  },
});

const upload = multer({ storage: storage });

// Update your MongoDB connection code
if (mongoose.connection.readyState === 0) { // Check if not connected
  mongoose.connect("your_mongodb_connection_string", {
    // Removed deprecated options
    // useNewUrlParser: true, // Deprecated
    // useUnifiedTopology: true, // Deprecated
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));
} else {
  console.log("MongoDB already connected");
}

module.exports = upload;
