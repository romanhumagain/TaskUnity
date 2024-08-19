const mongoose = require('mongoose')

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

// Membership Schema 
const membershipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'member', 'viewer'],
    default: 'member',
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
})

const invitationSchema = new mongoose.Schema({
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true,
  },
  inviter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  invited_email: {
    type: String,
    required: true,
  },
  link_id: {
    type: String,
    required: true,
  },
  expires_at: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'expired'],
    default: 'pending',
  },
}, { timestamps: true });


const workspaceTaskSchema = new mongoose.Schema({
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  assigned_users: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      is_completed: { type: Boolean, default: false }
    }
  ],
  priority: {
    type: String,
    required: true
  },
  due_date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['todo', 'in_progress', 'completed'],
    default: 'todo'
  }
}, { timestamps: true })

const workspaceSubTaskSchema = new mongoose.Schema({
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'workspace_task',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  }
}, { timestamps: true })

const WorkspaceTask = mongoose.model('workspace_task', workspaceTaskSchema);
const Workspace = mongoose.model('Workspace', workspaceSchema);
const Membership = mongoose.model('Membership', membershipSchema);
const Invitation = mongoose.model('Invitation', invitationSchema);
const Subtask = mongoose.model('Subtask', workspaceSubTaskSchema);

module.exports = {
  Workspace,
  Membership,
  Invitation,
  WorkspaceTask,
  Subtask
};