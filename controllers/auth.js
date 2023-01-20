const UserSchema = require("../mongooseSchemas/User");
const GameSchema = require("../mongooseSchemas/Game");

const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

async function login(req, res) {
  const { login, password } = req.body;
  const result = { res: false, error: null, token: null, uid: null,login };

  const currUser = await UserSchema.findOne({ login });
  if (currUser) {
    const isPasswordCorrect = await bcrypt.compare(password, currUser.password);
    result.res = isPasswordCorrect;
    result.error = isPasswordCorrect ? null : "Неверный пароль";
    result.uid = currUser._id;
  } else {
    result.res = false;
    result.error = "Такого пользователя не существует";
  }
  if (result.res && currUser) {
    result.token = jwt.sign(
      { login:currUser.login,uid:currUser._id},
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
  }


  res
    .status(result.res ? StatusCodes.OK : StatusCodes.UNAUTHORIZED)
    .json(result);
}

async function register(req, res) {
  const user = req.body;
  const newUser = await UserSchema.create(user);

  const { login,_id } = newUser;
  const token = jwt.sign({ login,uid:_id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(StatusCodes.CREATED).json({ msg: "Пользователь создан", token,uid:_id,login });
}
async function validateToken(req, res) {
  const { token } = req.body;
  const result = jwt.verify(token, process.env.JWT_SECRET);
  // const x = await GameSchema.create({
  //   user: `63c6c1c17618342770ed9a93`,
  //   title: "asdasd",
  //   descr: "really good game really good game really good game really good game really good game really good gamereally good game really good game really good game really good game really good game really good game really good game really good game really good gamereally good game really good game really good game really good game really good game really good game really good game really good game really good gamereally good game really good game really good game really good game really good game really good game really good game really good game really good gamereally good game really good game really good game really good game really good game really good game really good game really good game really good gamereally good game really good game really good game",
  //   score: 2,
  //   date: new Date(),
  // });

  res.status(StatusCodes.OK).json(result);
}

module.exports = {
  login,
  register,
  validateToken,
};
