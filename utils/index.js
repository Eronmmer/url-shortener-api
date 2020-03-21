const mongoose = require("mongoose")
const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(mongoURI, {
			 useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
	})
	console.log("MongoDB Connected!")
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

module.exports = {
	connectDB
}
