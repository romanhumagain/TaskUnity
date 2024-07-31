const Profile = require("../models/userProfileModel");

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

module.exports = { getProfileDetails,update_profile };
