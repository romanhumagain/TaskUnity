const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  is_read: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
