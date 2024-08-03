const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    type: String,
    required: false
  },
  phone_number: {
    type: Number,
    required: false
  },
  bio: {
    type: String,
    required: false
  },
  profileImage: {
    type: String
  }
});
const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;