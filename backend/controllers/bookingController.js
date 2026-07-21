const Booking = require("../models/Booking");

// @desc    Create a new table booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  const { name, phone, date, time, totalPerson } = req.body;

  try {
    const booking = new Booking({
      user: req.user._id,
      name,
      phone,
      date,
      time,
      totalPerson,
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get logged in user's bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all table bookings (admin)
// @route   GET /api/bookings
// @access  Private/Admin
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}) // get all bookings
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking status (accept/reject)
// @route   PATCH /api/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
  const { status } = req.body;

  if (!["pending", "accepted", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid booking status" });
  }

  try {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      booking.status = status;
      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
};
