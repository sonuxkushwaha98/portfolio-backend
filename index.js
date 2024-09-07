const express = require('express');
const app = express();
const cors = require('cors');
require("./db/config");  // Ensure this is properly set up
const Users = require('./db/users');

app.use(express.json());
app.use(cors({
    origin: "*",  // Allow all origins for development
    methods: "GET,POST,PUT,DELETE",  // Allowed methods
    allowedHeaders: "Content-Type,Authorization"  // Allowed headers
}));

app.get('/', (req, resp) => {
    resp.send("hello");
});

app.post("/register", async (req, resp) => {
    let user = new Users(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
});

app.post("/login", async (req, resp) => {
    console.log("Login request received with body:", req.body);
    
    if (req.body.email && req.body.password) {
        let user = await Users.findOne(req.body).select("-password");
        if (user) {
            resp.send(user);
        } else {
            console.log("No user found");
            resp.send({ result: "no user found" });
        }
    } else {
        console.log("Invalid request body");
        resp.send({ result: "no user found" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
