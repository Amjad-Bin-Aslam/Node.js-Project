const express =  require('express')
const fs = require("fs")
// const users = require("./MOCK_DATA.json")
const mongoose = require("mongoose");
const { type } = require('os');
const { stringify } = require('querystring');

const PORT = 8000;
const app = express();

//connection
mongoose.connect("mongodb://127.0.0.1:27017/Practice")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Mongo Error: " , err));


// schema
const userSchema =  new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String
    },
    gender: {
        type: String
    },

    
} ,
 { timestamps: true}
);

const User = mongoose.model("user" , userSchema);


// Middleware - Plugin
app.use(express.urlencoded({ extended: false }))

// app.use((req , res , next) => {
//     console.log(req.headers)
//     // custom Header
//     //  res.setHeader("X-MyName" , "Amjad")
//     //  return res.json(users)
// });


app.get('/users' , async (req , res) => {
    const allDBUsers = await User.find({})
    const html = `
        <ul>
            ${allDBUsers.map((users) => `<li>${users.firstName} - ${users.email}</li>`).join("")}
        </ul>
    `;
    res.send(html)
})

// Routes
app.get('/api/users' , async (req , res) => {
    const allDBUsers = await User.find({})
    return res.json(allDBUsers)
})

app.route("/api/users/:id")
.get(async (req , res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({error: "User not found"})
        // res.send("user not found")
    }
    return res.json(user)
})
.patch( async (req , res) => {
    //Edit user
    await User.findByIdAndUpdate(req.params.id , { lastName: "Changed"});
    res.json({status: "success"})
})
.delete(async (req , res) => {
    //Delete user
    await User.findByIdAndDelete(req.params.id)
    
    return res.json({status: "Success"})
    
});

app.post('/api/users' , async (req , res) => {
    // Create user
    const body = req.body;
    if(!body ||
       !body.first_name ||
       !body.last_name ||
       !body.email ||
       !body.gender ||
       !body.job_title
    )
    {
        return res.status(400).json({message: "All fields are required."})
    }

    const result = await User.create( {
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
    
    return res.status(201).json({ msg: "Success"})
    
})



app.listen(PORT , () => {
    console.log(`Server started at PORT: ${PORT}`)
})


