const Task = require('../models/taskModel')

// to get all the task even if they are over due
const getAllTasks = async (req, res) => {
  try {
    const query = {
      user:req.user._id,
    }

    const tasks = await Task.find(query).sort({ created_at: -1 });
    res.status(200).json(tasks)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const getTasks = async (req, res) => {
  try {
    const {priority} = req.query;
    const query = {
      user:req.user._id,
      due_date:{$gt:new Date()}
    }
    if (priority){
      query.priority = priority
    }

    const tasks = await Task.find(query).sort({ created_at: -1 });
    res.status(200).json(tasks)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getCompletedTasks = async (req, res) => {
  try {
    const query = {user:req.user._id, is_completed:true}
   
    const tasks = await Task.find(query).sort({ created_at: -1 });
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getPendingTasks = async (req, res) => {
  try {
    const query = {user:req.user._id, is_completed:false,due_date:{$gt:new Date()}}
    const tasks = await Task.find(query).sort({ created_at: -1 });
    
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getImportantTasks = async (req, res) => {
  try {
    const query = {user:req.user._id, is_important:true, due_date:{$gt:new Date()}}
    const tasks = await Task.find(query).sort({ created_at: -1 });
    
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getOverdueTasks = async (req, res) => {
  try {
    const query = {
      user:req.user._id,
      due_date:{$lt: new Date()},
      is_completed:false
      };
    const tasks = await Task.find(query).sort({ created_at: -1 });
    
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
    const { title, description, due_date, priority, is_important, is_completed } = req.body;

    const updateFields = {
      ...(title && { title }),
      ...(description && { description }),
      ...(priority && { priority }),
      ...(due_date && { due_date }),
      ...(is_important !== undefined && { is_important }),
      ...(is_completed !== undefined && { is_completed }),
      updated_at: Date.now()
    };

    const updatedTask = await Task.findByIdAndUpdate(id, updateFields, { new: true });

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
  getAllTasks,
  getTasks,
  fetchTaskDetails,
  getCompletedTasks,
  getPendingTasks,
  createTask,
  updateTask,
  deleteTask,
  getOverdueTasks,
  getImportantTasks
}