const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my-student-2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.error("MongoDB Connection Failed!"));

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening on port ${port}....`);
});

// Authentication
// sign up/ login -> JWT

// Authorization