const { Workspace, Membership, Invitation } = require('../models/workspaceModel');
const { sendMail } = require('../../sendMail')
const { v4: uuidv4 } = require('uuid');
const Notification = require('../models/notificationModel')
const User = require('../models/userModels')

const sendErrorResponse = (res, error) => {
  console.log(error);
  res.status(500).json({ msg: error.message });
}

// to get the users workspace
const get_workspace = async (req, res) => {
  try {
    const workspaces = await Workspace.find({ users: req.user._id }).populate('users').sort({ createdAt: -1 });
    if (!workspaces || workspaces.length === 0) {
      return res.status(404).json({ msg: 'No workspaces found for this user' });
    }
    res.status(200).json(workspaces)
  } catch (error) {
    sendErrorResponse(res, error)
  }
  
};

const get_workspace_details = async (req, res) => {
  try {
    const { id } = req.params
    const workspace = await Workspace.findOne({ users: req.user._id, _id: id });
    if (!workspace || workspace.length === 0) {
      return res.status(404).json({ msg: 'No workspaces found!' });
    }
    res.status(200).json(workspace)
  } catch (error) {
    sendErrorResponse(res, error)
  }
};

// to create new workspace
const create_workspace = async (req, res) => {
  try {
    const { name, description, priority } = req.body;
    const workspace = new Workspace({
      name, description, priority, users: [req.user._id], created_by: req.user._id
    })
    await workspace.save();

    const membership = new Membership({
      user: req.user._id,
      workspace: workspace._id,
      role: 'admin'
    })

    await membership.save()
    res.status(201).json({
      message: 'Successfully created workspace!',
      workspace,
      membership
    });

  } catch (error) {
    sendErrorResponse(res, error)
  }
};

const invite_users = async (req, res) => {
  try {
    const { workspace, emails } = req.body;

    // Find the workspace
    const workspace_data = await Workspace.findById(workspace);
    if (!workspace_data) {
      return res.status(404).json({ message: 'Workspace not found!' });
    }

    for (let i = 0; i < emails.length; i++) {
      let inviteLinkId = uuidv4();

      // Ensure unique link_id for each invitation
      while (await Invitation.findOne({ link_id: inviteLinkId })) {
        inviteLinkId = uuidv4();
      }

      const invitation = new Invitation({
        workspace,
        inviter: req.user._id,
        invited_email: emails[i],
        link_id: inviteLinkId,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      await invitation.save();

      // to send notification
      const user = await User.findOne({ email: emails[i] });

      if (user) {
        const description = `🎉You've been invited to join a new workspace, ${workspace_data.name} !`
        const notification = new Notification({ description, receiver: user._id });
        await notification.save();
      };

      const invitedLink = `http://localhost:5173/verify-workspace/${workspace}/${inviteLinkId}/`;

      // HTML content for the email
      const htmlContent = `
        <p>You are invited to the following link to join your new workspace:</p>
        <p>If you haven't created your account in TaskUnity, please sign up first and then follow this link to join the workspace:</p>
        <a href="${invitedLink}">${invitedLink}</a>
      `;

      await sendMail(emails[i], 'Invitation link for your project workspace', htmlContent);
    }

    res.status(200).send('Invitations sent successfully!');
  } catch (error) {
    sendErrorResponse(res, error);
  }
};


const verify_invited_user = async (req, res) => {
  try {
    const { workspace_id, invitation_id } = req.body;

    const existing_invitation = await Invitation.findOne({ workspace: workspace_id, link_id: invitation_id, invited_email: req.user.email });
    if (!existing_invitation) {
      return res.status(404).json({ message: 'Invalid Invitation Link !' });
    }
    if (existing_invitation.expires_at < new Date()) {
      return res.status(403).json({ message: 'Invitation link expired !' });
    }
    const existing_membership = await Membership.findOne({ user: req.user._id, workspace: workspace_id })
    if (existing_membership) {
      return res.status(400).json({ message: 'Already a member in this workspace !' });
    }

    res.status(200).json({ message: "Successfully Verified !" })
  } catch (error) {
    sendErrorResponse(res, error)
  }
}

const add_membership = async (req, res) => {
  try {
    const { workspace_id } = req.body;

    // Find the workspace
    const updated_workspace = await Workspace.findById(workspace_id);
    if (!updated_workspace) {
      return res.status(404).json({ message: 'Workspace not found!' });
    }

    // Add the user to the workspace's users array if not already present
    if (!updated_workspace.users.includes(req.user._id)) {
      updated_workspace.users.push(req.user._id);
      await updated_workspace.save();
    }

    // Find the invitation
    const invitation = await Invitation.findOne({ workspace: workspace_id, invited_email: req.user.email });
    if (!invitation) {
      return res.status(404).json({ message: 'Invitation not found!' });
    }

    // Check if the user is already a member
    const existing_membership = await Membership.findOne({ user: req.user._id, workspace: workspace_id });
    if (existing_membership) {
      return res.status(400).json({ message: 'Already a member of this workspace!' });
    }

    // Create a new membership
    const membership = new Membership({
      workspace: workspace_id,
      user: req.user._id,
      role: 'member'
    });
    await membership.save();

    // Update the invitation status
    await Invitation.findOneAndUpdate(
      { workspace: workspace_id, invited_email: req.user.email },
      { $set: { status: 'verified' } },
      { new: true }
    );

    // to send notification to the inviter
    const description = `🤝${req.user.full_name} has accepted your invitation to join the ${updated_workspace.name} workspace.`;
    const notification = new Notification({
      description,
      receiver: invitation.inviter
    });
    await notification.save();

    res.status(200).json({ message: 'Successfully verified! You are now a member of this workspace!' });

  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const get_workspace_users = async (req, res) => {
  try {
    const { workspace_id } = req.params
    const membership_user = await Membership.find({ workspace: workspace_id }).populate({ path: 'user' }).sort({ role: 1 })
    const pending_member = await Invitation.find({ workspace: workspace_id, status: 'pending' })

    res.status(200).json({ verified_member: membership_user, pending_member: pending_member })
  } catch (error) {
    sendErrorResponse(res, error)
  }
}

const remove_invitation = async (req, res) => {
  try {
    const { id } = req.params
    await Invitation.findByIdAndDelete(id)
    res.status(200).json({ message: 'Successfully removed invitation !' })

  } catch (error) {
    sendErrorResponse(res, error)
  }
}

const delete_workspace = async (req, res) => {
  try {
    const { workspace_id } = req.params;
    console.log(workspace_id)

    // Find and delete the workspace
    const workspace = await Workspace.findByIdAndDelete(workspace_id);
    if (!workspace) {
      return res.status(404).json({ msg: 'Workspace not found!' });
    }

    // Delete invitations related to the workspace
    await Invitation.deleteMany({ workspace: workspace_id });

    // Delete memberships related to the workspace
    await Membership.deleteMany({ workspace: workspace_id });

    res.status(200).json({ message: 'Workspace and related data successfully deleted' });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const verify_workspace = async (req, res) => {
  try {
    const { workspace_id } = req.params;

    const workspace = await Workspace.findOne({
      _id: workspace_id,
      users: req.user._id
    });

    if (!workspace) {
      return res.status(401).json({ msg: 'Unauthorized access to workspace!' });
    }

    res.status(200).json({ msg: 'User authenticated for the workspace.' });

  } catch (error) {
    sendErrorResponse(res, error);
  }
};


module.exports = {
  get_workspace,
  create_workspace,
  get_workspace_details,
  invite_users,
  verify_invited_user,
  add_membership,
  get_workspace_users,
  remove_invitation,
  delete_workspace,
  verify_workspace
}