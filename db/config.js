const mongoose = require("mongoose");

const uri = process.env.DB_CONNECTION;

const bdConnection = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("DB en linea");
  } catch (error) {
    console.error(error);
  }
};

module.exports = bdConnection;
