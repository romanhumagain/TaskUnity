const Notification = require('../models/notificationModel');
const User = require('../models/userModels');

const sendErrorResponse = (res, error) => {
  console.log(error);
  res.status(500).json({ msg: error.message });
};

const get_notification = async (req, res) => {
  try {
    const notifications = await Notification.find({ receiver: req.user._id }).sort({createdAt:-1});
    res.status(200).json(notifications);
    console.log(notifications)
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const get_unread_notification = async (req, res) => {
  try {
    const unreadNotifications = await Notification.find({ receiver: req.user._id, is_read: false });
    res.status(200).json(unreadNotifications);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const mark_notification_read = async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { receiver: req.user._id, is_read: false },
      { $set: { is_read: true } }
    );
    res.status(200).json({
      success: true,
      message: 'All notifications marked as read',
      data: result
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const send_notification = async (req, res) => {
  try {
    const { description, email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const notification = new Notification({ description, receiver: user._id });
      await notification.save();

      res.status(201).json({
        msg: "Notification successfully created",
        data: notification
      });
    } 
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

module.exports = {
  get_notification, 
  get_unread_notification,
  mark_notification_read, 
  send_notification
};
