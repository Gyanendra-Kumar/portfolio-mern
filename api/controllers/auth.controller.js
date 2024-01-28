import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  //   console.log(req.body);
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required!"));
  }

  const duplicateUser = await User.findOne({ username: username }).exec();
  if (duplicateUser)
    return next(errorHandler(409, "Duplicate username or email"));

  try {
    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    console.log(newUser);
    res.status(201).json({ success: `New user created!` });
  } catch (error) {
    next(error);
  }
};

// SIGN IN CONTROLLER
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All Fields are required!"));
  }

  try {
    // validating User Email
    const validUser = await User.findOne({ email: email }).exec();
    // validating password
    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validPassword || !validUser)
      next(errorHandler(404, "Invalid Credentials!"));
  } catch (error) {
    next(error);
  }
};
