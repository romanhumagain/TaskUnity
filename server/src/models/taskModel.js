const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  description: { 
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  due_date: {
    type: Date,
    required: true
  },
  is_important: {
    type: Boolean,
    default: false
  },
  is_completed: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

taskSchema.pre("save", async function (next) {
  this.updated_at = Date.now();
  next();
});

const Task = mongoose.model('Task', taskSchema)
module.exports = Task