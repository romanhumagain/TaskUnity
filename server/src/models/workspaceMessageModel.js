const mongoose = require('mongoose')


const workspaceMessageSchema = new mongoose.Schema({
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true,
  },
  read_by: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

}, { timestamps: true });

const workspaceTaskActivitySchema = new mongoose.Schema({
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true
  },
  workspace_task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'workspace_task',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activity: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }

}, { timestamps: true });



const WorkspaceMessage = mongoose.model("workspace_message", workspaceMessageSchema);
const WorkspaceTaskActivity = mongoose.model("workspace_task_activity", workspaceTaskActivitySchema);


module.exports = {
  WorkspaceMessage, WorkspaceTaskActivity
};