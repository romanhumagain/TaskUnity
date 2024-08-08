const { WorkspaceMessage, WorkspaceTaskMessage } = require('../models/workspaceMessageModel')
const { Workspace, WorkspaceTask } = require('../models/workspaceModel')
const mongoose = require('mongoose');

const sendErrorResponse = (res, error) => {
  console.log(error);
  res.status(500).json({ msg: error.message });
}

const read_workspace_message = async (req, res) => {
  try {
    const { workspace_id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(workspace_id)) {
      return res.status(400).json({ msg: 'Invalid workspace ID format!' });
    }

    // Convert workspace_id to ObjectId
    const workspaceObjectId = new mongoose.Types.ObjectId(workspace_id);

    // Check if workspace exists
    const workspace = await Workspace.findById(workspaceObjectId);
    if (!workspace) {
      return res.status(404).json({ msg: 'Workspace not found!' });
    }

    // Fetch messages with user and profile details
    const messages = await WorkspaceMessage.aggregate([
      {
        $match: { workspace: workspaceObjectId }
      },
      {
        $lookup: {
          from: 'users', // Collection to join
          localField: 'sender', // Field from WorkspaceMessage
          foreignField: '_id', // Field from User
          as: 'senderDetails' // Name of the new field
        }
      },
      {
        $unwind: '$senderDetails' // Deconstruct the array
      },
      {
        $lookup: {
          from: 'profiles', // Collection to join
          localField: 'senderDetails._id', // Field from User
          foreignField: 'user', // Field from Profile
          as: 'senderProfile' // Name of the new field
        }
      },
      {
        $unwind: '$senderProfile' // Deconstruct the array
      }
    ]);

    res.status(200).json(messages);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const send_message_to_workspace = async (req, res) => {
  try {
    const { workspace_id } = req.params
    const { message } = req.body;

    const workspaceMessage = new WorkspaceMessage({
      workspace: workspace_id,
      sender: req.user._id,
      message,
      read_by:[req.user._id]
    });
    await workspaceMessage.save()

    res.status(200).json({ message: 'Successfully sent message !' })

  } catch (error) {
    sendErrorResponse(res, error)
  }
};

const read_workspace_task_message = async (req, res) => {
  try {
    const { workspace_id, task_id } = req.params

    const workspace = await Workspace.findById(workspace_id);
    if (!workspace) {
      return res.status(404).json({ msg: 'Workspace not found!' });
    };

    const workspaceTask = WorkspaceTask.findById(task_id);
    if (!workspaceTask) {
      return res.status(404).json({ msg: 'Workspace Task not found!' });
    };

    const message = await WorkspaceTaskMessage.find({ workspace: workspace_id, workspace_task: task_id });
    res.status(200).json(message)

  } catch (error) {
    sendErrorResponse(res, error)
  }
}

const send_message_to_workspace_task = async (req, res) => {
  try {
    const { workspace_id, task_id } = req.params
    const { message } = req.body;

    const workspaceTaskMessage = new WorkspaceTaskMessage({
      workspace: workspace_id,
      workspace_task: task_id,
      sender: req.user._id,
      message,
    });
    await workspaceTaskMessage.save()

    res.status(200).json({ message: 'Successfully sent message !' })

  } catch (error) {
    sendErrorResponse(res, error)
  }
}

const get_unread_message = async (req, res) => {
  try {
    const { workspace_id } = req.params;
    const workspace = await Workspace.findById(workspace_id);
    if (!workspace) {
      return res.status(404).json({ msg: 'Workspace not found!' });
    }
    const messages = await WorkspaceMessage.find({
      workspace:workspace_id,
      read_by:{$ne:req.user._id}
    })

    res.status(200).json(messages)

  } catch (error) {
    sendErrorResponse(res, error)
  }
};

const addMessageReader = async (req, res) => {
  try {
    const { workspace_id } = req.params;
    const workspace = await Workspace.findById(workspace_id);
    
    if (!workspace) {
      return res.status(404).json({ msg: 'Workspace not found!' });
    }

    // Update all messages to add the user to the `read_by` array
    const result = await WorkspaceMessage.updateMany(
      { workspace: workspace_id, read_by: { $ne: req.user._id } },
      { $addToSet: { read_by: req.user._id } }
    );

    if (result.nModified === 0) {
      return res.status(200).json({ msg: 'No new messages to mark as read.' });
    }

    res.status(200).json({ msg: 'Successfully marked all messages as read!' });

  } catch (error) {
    sendErrorResponse(res, error)
  }
};

module.exports = {
  send_message_to_workspace_task,
  read_workspace_message,
  send_message_to_workspace,
  read_workspace_task_message,
  get_unread_message,
  addMessageReader
}
