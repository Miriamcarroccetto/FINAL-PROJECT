import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    experienceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience',
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    message: {type: String, default: ""}
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;