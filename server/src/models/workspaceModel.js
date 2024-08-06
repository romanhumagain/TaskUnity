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

const Workspace = mongoose.model('Workspace', workspaceSchema)
const Membership = mongoose.model('Membership', membershipSchema);
const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = {
  Workspace,
  Membership,
  Invitation
};