import mongoose from 'mongoose'
import { nanoid } from 'nanoid'

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    code: {
        type: String,
        default: () => nanoid(5),
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense',
    }]
})

// Create and export Group model
export const Group = mongoose.model('Group', groupSchema)