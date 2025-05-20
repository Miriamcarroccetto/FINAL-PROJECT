import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema ({
    title: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    city: {type: String, required: true},
    price: {type: Number, required: true},
    duration: {
        type: new mongoose.Schema ({
            value: {type: Number, required: true},
            unit: {type: String, required: true}
        }),
        required: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {type: Date, required: true}
 
});

const Experience = mongoose.model ('Experience', experienceSchema);
export default Experience;