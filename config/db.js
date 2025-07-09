const { default: mongoose } = require("mongoose");

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/ecommerce-app', { useNewUrlParser: true });
        console.log('Connected to MongoDB database!'.bgYellow.black);
    } catch (err) {
        console.error('Error connecting to MongoDB database:', err);
    }
}
connectToDatabase();