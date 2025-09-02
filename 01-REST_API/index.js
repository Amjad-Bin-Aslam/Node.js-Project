const express =  require('express')
const fs = require("fs")
const users = require("./MOCK_DATA.json")

const PORT = 8000;
const app = express();

// url Plugin
app.use(express.urlencoded({ extended: false }))

app.get('/users' , (req , res) => {
    const html = `
        <ul>
            ${users.map((users) => `<li>${users.first_name}</li>`).join("")}
        </ul>
    `;
    res.send(html)
})

// Routes
app.get('/api/users' , (req , res) => {
    return res.json(users)
})

app.route("/api/users/:id")
.get((req , res) => {
    const id =Number(req.params.id)
    const user = users.filter((user) => user.id === id)
    if(!user){
        return res.status(404).json({error: "User not found"})
        // res.send("user not found")
    }
    return res.json(user)
})
.patch((req , res) => {
    //Edit user(
    res.json({status: "pending"})
})
.delete((req , res) => {
    //Delete user
    const id = Number(req.params.id)
    const user = users.findIndex((user) => user.id  === id)
    if(user === -1){
        return res.status(404).json({status: "error" , message: "user not found"})
    }

    users.splice(user ,  1);

    fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users) , (err) => {
        if(err){
            return res.status.json({status: "error" , message: "Failed to delete user"})
        }
        return res.json({status: "Success" , message: "User Deleted successfully"})
    });
    
});

app.post('/api/users' , (req , res) => {
    // Create user
    const body = req.body;
    users.push({...body , id:users.length + 1});
    fs.writeFile("./MOCK_DATA.json" , JSON.stringify(users) , (err , data) => {
        return res.json({status: "success"})
    })
    
})



app.listen(PORT , () => {
    console.log(`Server started at PORT: ${PORT}`)
})


