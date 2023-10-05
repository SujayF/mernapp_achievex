const mongoose = require('mongoose')
// require('dotenv').config({ path: '.env' },);
const dotenv = require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error: ${error} `)
    process.exit(1)
  }
}

module.exports = connectDB