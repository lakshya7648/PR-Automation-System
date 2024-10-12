const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log('Connection Established Successfully!');
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectToDatabase;
