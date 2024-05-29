import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const accessToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
const refreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const registerdUser = async (req, res) => {
  const { username, password } = req.body;

  if (typeof password !== "string")
    return res.status(400).json({ error: "Password must be a string" });

  try {
    const user = await User.create({ username, password });

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(201)
      .cookie("refreshToken", refreshToken(user._id), options)
      .json({ user, accessToken: accessToken(user._id, user.username) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: "User not found" });

    const ispasswordCorrect = await user.matchedPassword(password);

    if (!ispasswordCorrect)
      return res.status(401).json({ error: "Invalid password" });

    const loggedInUser = await User.findById(user._id).select("-password");
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(201)
      .cookie("refreshToken", refreshToken(user._id), options)
      .json({
        loggedInUser,
        accessToken: accessToken(user._id, user.username),
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserTasks = async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = User.findById(userId).populate("tasks");

    console.log(tasks);

    return res.status(200).json({ tasks });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { registerdUser, loginUser, getUserTasks };
