const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require('./models/Employee');

const app = express();
const port = 3001;

// Middleware
app.use(cors(
    {
        origin: ["https://deploy-mern-1whq.vercel.app"],
        methods: ["POST","GET"],
        credentials: true
    }
));
app.use(express.json());



// MongoDB Connection
mongoose.connect("mongodb+srv://shravanikadage:123@cluster0.wigjk.mongodb.net/employee?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to Server');
});


// Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.json("Success");
            } else {
                res.json("Password is incorrect");
            }
        } else {
            res.json("You are not Registered");
        }
    })
    .catch(err => res.json(err));
});

// Register Route
app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err));
});

// Start Server
app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
});
