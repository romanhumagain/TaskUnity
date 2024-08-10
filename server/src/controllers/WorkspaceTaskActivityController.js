const mongoose = require('mongoose')
const { WorkspaceMessage, WorkspaceTaskActivity } = require('../models/workspaceMessageModel')

const sendErrorResponse = (res, error) => {
  console.log(error);
  res.status(500).json({ msg: error.message });
}

const read_activity_message = async (req, res) => {
  try {
    const { workspace_id, task_id } = req.params;
    const activities = await WorkspaceTaskActivity.find({ workspace: workspace_id, workspace_task: task_id });
    res.status(200).json(activities)
  } catch (error) {
    sendErrorResponse(res, error)
  }
};

const send_activity_message = async (req, res) => {
  try {
    const { workspace_id, task_id } = req.params;
    const { activity, message } = req.body;
    const activityMessage = new WorkspaceTaskActivity({
      workspace: workspace_id,
      workspace_task: task_id,
      activity,
      message
    })

    await activityMessage.save()
    res.status(200).json(activityMessage)
  } catch (error) {
    sendErrorResponse(res, error)
  }
};

module.exports = {
  read_activity_message, send_activity_message
}