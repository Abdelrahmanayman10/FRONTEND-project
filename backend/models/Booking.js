const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a name for the booking']
  },
  phone: {
    type: String,
    required: [true, 'Please provide a contact phone number']
  },
  date: {
    type: String,
    required: [true, 'Please provide a reservation date']
  },
  time: {
    type: String,
    required: [true, 'Please provide a reservation time']
  },
  totalPerson: {
    type: String,
    required: [true, 'Please specify the number of guests']
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
