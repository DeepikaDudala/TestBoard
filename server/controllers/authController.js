const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../database/models/userModel");

const userRegister = AsyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !name || !password) {
    res.status(400);
    throw new Error("please fill all fields");
  }

  try {
    let user;
    if (!role) {
      user = await User.create({ name, email, password });
    } else {
      user = await User.create({ name, email, password, role });
    }
    res.status(200).json({
      status: "success",
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});
const userLogin = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("please fill all fields");
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }
    res.status(200).json({
      status: "success",
      token: createToken(user.id),
    });
  } catch (err) {
    res.status(400);
    throw new Error("User not Found");
  }
});

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { userLogin, userRegister };
