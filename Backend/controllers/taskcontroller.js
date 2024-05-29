import mongoose from "mongoose";
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";

//create task

const createTask = async (req, res) => {
  const { title, completed } = req.body;

  const userId = req.user._id;

  if (!title) {
    res.status(400).json({ message: "Please add a title" });
  }

  try {
    const existingTask = await Task.findOne({ title });

    if (existingTask) {
      return res.status(400).json({ message: "Task already exists" });
    }

    const task = await Task.create({ title, completed, user: userId });

    const savedTask = await task.save();
    // console.log(savedTask);

    const user = await User.findById(userId);

    user.tasks.push(savedTask._id);

    await user.save();

    return res.status(201).json({
      success: true,
      data: savedTask,
      message: "Task created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//getTasks

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete tasks

const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).json({ message: "Invalid Task Id" });
  }

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//update tasks

const updateTask = async (req, res) => {
  const { id } = req.params;

  const { title, completed } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "Invalid Task Id" });

  if (title === undefined && completed === undefined) {
    return res.status(400).json({ message: "No fields to update" });
  }
  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await task.save();

    res
      .status(200)
      .json({ message: "Task updated successfully", data: updatedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createTask, getTasks, deleteTask, updateTask };

//read tasks

//create a task
//read all tasks
//read a task
//update a task
//delete a task
