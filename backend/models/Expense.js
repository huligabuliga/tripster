import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    categories: [{
        type: String,
    }],
    currency: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    payer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    payees: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        shareAmount: {
            type: Number,
            required: true,
        },
        sharePercentage: {
            type: Number,
            required: true,
        }
    }],
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    },
});

// Create and export Expense model
export const Expense = mongoose.model('Expense', expenseSchema)