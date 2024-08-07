const { WorkspaceMessage, WorkspaceTaskMessage } = require('../models/workspaceMessageModel')
const { Workspace, WorkspaceTask } = require('../models/workspaceModel')

const sendErrorResponse = (res, error) => {
  console.log(error);
  res.status(500).json({ msg: error.message });
}
const read_workspace_message = async (req, res) => {
  try {
    const { workspace_id } = req.params

    const workspace = await Workspace.findById(workspace_id);
    if (!workspace) {
      return res.status(404).json({ msg: 'Workspace not found!' });
    };

    const message = await WorkspaceMessage.find({ workspace: workspace_id });
    res.status(200).json(message)

  } catch (error) {
    sendErrorResponse(res, error)
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

module.exports = {
  send_message_to_workspace_task,
  read_workspace_message,
  send_message_to_workspace,
  read_workspace_task_message
}