import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB Connection Successful')
    } catch (error) {
        console.error('MongoDB Connection Error', error)
    }
}

export default connectDB