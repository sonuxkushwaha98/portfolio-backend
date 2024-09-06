const express = require('express');
const app = express();
const cors = require('cors')
require("./db/config")
const Users = require('./db/users');
app.use(express.json());
app.use(cors({
    origin:["https://sonu-portfolio-sigma.vercel.app"],
    methods:["POST","GET"],
    credentials:true
}
));
app.post("/register", async (req, resp) => {
    let user = new Users(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result)

})

app.post("/login", async (req, resp) => {
    if (req.body.email&& req.body.password) {
        let user = await Users.findOne(req.body).select("-password");
        if (user) {
            resp.send(user);
        } else {
            resp.send({ result: "no user found" });
        }
    } else {
        resp.send({ result: "no user found" });
    }


})
app.listen(process.env.port || 8000);
