const Task = require('../models/taskModel')


const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find({user:req.user._id}).sort({updated_at:-1});
    res.status(200).json(tasks)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const fetchTaskDetails = async (req, res) => {
  try {
    const { id } = req.params

    const task = await Task.findOne({user:req.user._id, _id:id});
    res.status(200).json(task)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createTask = async (req, res) => {
  try {
    // const user = req.user.id
    const { title, description, due_date, priority, is_important } = req.body;
    const task = new Task({
      user:req.user._id,
      title,
      description,
      due_date,
      priority,
      is_important
    });
    const createdTask = await task.save();
    res.status(201).json({ createdTask });

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, due_date, priority, is_important } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id,
      { title, description, priority, due_date, is_important, updated_at: Date.now() },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found !' })
    }
    res.status(200).json({ message: 'Successfully updated task!', task: updatedTask });

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully !" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getTasks,
  fetchTaskDetails,
  createTask,
  updateTask,
  deleteTask
}