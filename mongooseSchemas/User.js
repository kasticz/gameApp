const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = new mongoose.Schema({
  login: {
    type: String,
    required: [true, "Пожалуйста, заполните логин"],
    trim: true,
    minLength: [5, "Логин не может быть короче 5 символов"],
    maxLength: [30, "Логин не может быть длиннее 30 символов"],
  },
  email: {
    type: String,
    required: [true, "Пожалуйста, заполните электронную почту"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Пожалуйста, заполните пароль"],
    minlength: [6, "Пароль не может быть короче 6 символов"],
  },

});

User.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", User);
