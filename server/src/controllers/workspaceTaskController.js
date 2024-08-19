const { Workspace, WorkspaceTask, Subtask } = require('../models/workspaceModel')

const sendErrorResponse = (res, error) => {
  console.log(error);
  res.status(500).json({ msg: error.message });
}

const get_workspace_task = async (req, res) => {
  try {
    const { workspace_id } = req.params;
    const workspace = await Workspace.findById(workspace_id);

    if (!workspace) {
      return res.status(404).json({ msg: 'Workspace not found!' });
    };

    const workspaceTask = await WorkspaceTask.find({ workspace: workspace_id }).populate('assigned_users.user').sort({ createdAt: -1 });
    res.status(200).json(workspaceTask);

  } catch (error) {
    sendErrorResponse(res, error)
  }
}

const get_workspace_task_details = async (req, res) => {
  try {
    const { workspace_id, task_id } = req.params;

    // Find the task by its ID
    const task = await WorkspaceTask.findOne({ _id: task_id, workspace: workspace_id }).populate('assigned_users.user');

    const subtask = await Subtask.find({task:task_id})

    if (!task) {
      return res.status(404).json({ msg: 'Task not found!' });
    }
    res.status(200).json({task, subtask});
  } catch (error) {
    sendErrorResponse(res, error);
  }
};


const add_workspace_task = async (req, res) => {
  try {
    const { workspace_id } = req.params;
    const { title, description, assigned_users, due_date, priority, status } = req.body;

    const formattedAssignedUsers = assigned_users.map(userId => ({
      user: userId,
      is_completed: false
    }));

    const workspace = await Workspace.findById(workspace_id);
    if (!workspace) {
      return res.status(404).json({ msg: 'Workspace not found!' });
    };

    const workspaceTask = new WorkspaceTask({
      workspace: workspace_id,
      creator: req.user._id,
      title,
      description,
      assigned_users: formattedAssignedUsers,
      due_date: new Date(due_date),
      priority,
      status
    });

    await workspaceTask.save();
    res.status(201).json({ 'msg': 'Task Created Successfully' })

  } catch (error) {
    sendErrorResponse(res, error)
  }
};

const update_workspace_task = async (req, res) => {
  try {
    const { task_id } = req.params;
    const { title, description, assigned_users, due_date, priority, status } = req.body;

    const formattedAssignedUsers = assigned_users.map(userId => ({
      user: userId,
      is_completed: false
    }));

    const updatedTask = await WorkspaceTask.findByIdAndUpdate(
      task_id,
      {
        title,
        description,
        assigned_users: formattedAssignedUsers,
        due_date: new Date(due_date),
        priority,
        status
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ msg: 'Task not found!' });
    }

    res.status(200).json({ msg: 'Task updated successfully!', task: updatedTask });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const delete_workspace_task = async (req, res) => {
  try {
    const { task_id } = req.params;

    const deletedTask = await WorkspaceTask.findByIdAndDelete(task_id);

    if (!deletedTask) {
      return res.status(404).json({ msg: 'Task not found!' });
    }

    res.status(200).json({ msg: 'Task deleted successfully!' });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const add_subtask = async (req, res) => {
  try {
    const { task_id } = req.params;
    const { description, tag } = req.body;
    const subtask = new Subtask(
      {
        task: task_id,
        description,
        tag
      }
    );
    await subtask.save();
    res.status(200).json({ message: 'Successfully added subtask !' });

  } catch (error) {
    sendErrorResponse(res, error)
  }
};

const get_subtask = async (req, res) => {
  try {
    const { task_id } = req.params;
    const subtask = await Subtask.find({ task: task_id })

    res.status(200).json(subtask)
  } catch (error) {
    sendErrorResponse(res, error)
  }
};


module.exports = {
  get_workspace_task,
  get_workspace_task_details,
  add_workspace_task,
  update_workspace_task,
  delete_workspace_task,
  add_subtask,
  get_subtask
}