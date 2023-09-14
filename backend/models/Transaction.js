import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
    payer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    payee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

// Create and export Transaction model
export const Transaction = mongoose.model('Transaction', transactionSchema)