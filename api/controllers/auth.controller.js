import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// SIGN UP CONTROLLER
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
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // console.log(newUser);
    res.status(201).json({ success: `New user created!` });
  } catch (error) {
    next(error);
  }
};

// SIGN-IN CONTROLLER
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All Fields are required!"));
  }

  try {
    // validating User Email
    const validUser = await User.findOne({ email: email }).exec();
    // console.log(validUser);

    if (!validUser) return next(errorHandler(404, "Invalid Credentials!"));

    // validating password
    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validPassword) return next(errorHandler(404, "Invalid Credentials!"));

    const token = jwt.sign(
      {
        id: validUser._id,
        isAdmin: validUser.isAdmin,
        isEditor: validUser.isEditor,
        isUser: validUser.isUser,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "120s" }
    );

    const { password: _pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// GOOGLE AUTH CONTROLLER
export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      // CHECKING IF USER EXISTS
      const token = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
          isEditor: user.isEditor,
          isUser: user.isUser,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "120s" }
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      // IF USER IS LOGGING IN FOR FIRST TIME
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePhoto: googlePhotoUrl,
      });
      await newUser.save();

      // creating token
      const token = jwt.sign(
        {
          id: newUser._id,
          isAdmin: newUser.isAdmin,
          isEditor: newUser.isEditor,
          isUser: newUser.isUser,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "120s" }
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
