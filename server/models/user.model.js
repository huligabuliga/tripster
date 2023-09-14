import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    img: { 
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    }, 
    groups: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Group",
        },
      ],
}, { timestamps: true });

export default mongoose.model("User", userSchema);