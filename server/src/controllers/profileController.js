const Profile = require("../models/userProfileModel");
const {Membership } = require("../models/workspaceModel");

const domain = "http://localhost:3000";

const sendErrorResponse = (res, error) => {
  console.log(error);
  res.status(500).json({ msg: error.message });
};

const getProfileDetails = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate("user", ['full_name', "username", "email"]);
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res.status(200).json({ profile });
  } catch (error) {
    sendErrorResponse(res, error)
  }
}

const fetch_specific_user_profile = async(req, res)=>{
  try {
    const {user_id, workspace_id} = req.params
    const profile = await Profile.findOne({ user: user_id}).populate("user", ['full_name', "username", "email"]);
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    const membership = await Membership.findOne({user:user_id, workspace:workspace_id})
    if (!membership) {
      return res.status(404).json({ msg: "Membership not found" });
    }
    res.status(200).json({ profile, membership });
  } catch (error) {
    sendErrorResponse(res, error)
  }
}

const update_profile = async (req, res) => {
  try {
    let updateData = {};
    if (req.file) {
      const profileImage = `${domain}/uploads/profiles/${req.file.filename}`;
      updateData.profileImage = profileImage;
    }

    const profile = await Profile.findOneAndUpdate({ user: req.user._id }, updateData, { new: true, runValidators: true });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    res.status(200).json({
      msg: "Profile updated successfully",
      profile: profile,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = { getProfileDetails,update_profile, fetch_specific_user_profile };
