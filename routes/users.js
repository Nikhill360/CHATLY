require('dotenv').config()
const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB Connected'))
.catch(err => {
  console.error('MongoDB connection error:', err); // Improved error logging
  process.exit(1); // Exit the process if connection fails
});

//schema  
const userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  profileImage: String,
  posts: [{type: mongoose.Schema.Types.ObjectId, ref:"post"}], //post id store
  saved: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }], // Added saved field to store saved post IDs
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], // Added followers field
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }] // Added following field
});

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema); //  with this create delet data 
