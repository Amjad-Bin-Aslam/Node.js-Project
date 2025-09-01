const express =  require('express')
const users = require("./MOCK_DATA.json")

const PORT = 8000;
const app = express();



// app.get('/users' , (req , res) => {
//     const html = `
//         <ul>
//             ${users.map((users) => `<li>${users.first_name}</li>`).join("")}
//         </ul>
//     `;
//     res.send(html)
// })

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
    //Edit user
    res.json({status: "pending"})
})
.delete((req , res) => {
    //Delete user
    res.json({status: "pending"})
})

app.post('/api/users' , (req , res) => {
    // Create user
    return res.json({status: "pending"})
})



app.listen(PORT , () => {
    console.log(`Server started at PORT: ${PORT}`)
})


