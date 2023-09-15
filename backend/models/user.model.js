import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        //unique
        unique:true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        //take away
        required:false
    }]
})

// Create and export User model
export const User = mongoose.model('User', userSchema)