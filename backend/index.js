require('dotenv').config()
const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')
const verifyToken = require('./middleware/verifytoken')

//Collection import
const Users = require('./models/Users')
//const Notes = require('./models/Notes')

//const url = "mongodb+srv://PranithKumarDudala:xBXmmbi4oScOD7gq@cluster0.w6j8ltl.mongodb.net/loginDatabase?retryWrites=true&w=majority"
const url = process.env.MONGO_DB_URI
// mongodb connection using atlas
mongoose.connect(url)
.then((response) => {
    console.log("DB connected");
})
.catch((error) => {
    console.log("error connecting db", error);
})

app.use(cors())
app.use(express.json())
app.use(cookieparser())

app.get("/", (request, response) => {
    response.send("Hello from backend");
});

//post notes
app.post("/notes", (request, response) => {
    const {title, key, description} = request.body

    if(request.headers.authorization.startsWith('Bearer')){
        const jwtToken = request.headers.authorization.split(" ")[1]

    if(jwtToken){
        
        
        jwt.verify(jwtToken, "MY_SECRET_KEY", async (error, payload) => {
            if(error){
                return response.status(200).json({message : 'incorrect jwt'})
            }
            else{

                const {username} = payload

                const users = await Users.find({username : username})
                const userDetails = users[0]
                

                let notesList = []
                if(userDetails.NotesList === undefined){
                    userDetails.NotesList = [{title, key, description}]
                    userDetails.save()
                }
                else{
                    notesList = userDetails.NotesList
                    notesList.push({title, key, description})
                }

                const result = await Users.updateOne(
                    {username: username},
                    { $set : {NotesList : notesList}}
                    
                )

                const user = await Users.find({username : username})
                
                console.log("updated successfully")

                


            }
        })
    }
    }
    else{
        response.status(400).json({message : "jwt token not found"})
    }
})

//api to get details of a specific noteitem

app.get("/notes/:id",verifyToken ,async (request, response) => {

    const {id} = request.params
    const userDetails = request.user
    
    const users = await Users.find({username : userDetails.username})
    
    //const noteDetails = await Users.findOne({'NotesList._id' : id})

    const noteItems = users[0].NotesList.filter((each) => {
        return (each._id == id)
    })

    response.send(noteItems[0])
})

//get notes
app.get("/notes", verifyToken, async (request, response) => {

    try{


                const {username} = request.user
                
                const userData = await Users.findOne({username:username})
                
                response.json({NotesList : userData.NotesList})
            
        
    }
    catch(e){
        response.status(500).json({message : 'server error'})
    }
    
    

        
   
})

// Login API
app.post("/users", async (request, response) => {
    const userDetails = request.body;
    const { username, password } = userDetails;

    try {
        const user = await Users.findOne({ username: username });

        if (user) {
            if (user.password === password) {
                const payload = { username: username };
                const jwt_token = jwt.sign(payload, 'MY_SECRET_KEY');

                // Respond with the JWT token
                return response.status(200).json({ jwt_token });
            } else {
                // Respond with incorrect password message
                return response.status(401).json({ message: "Incorrect Password" });
            }
        } else {
            // Respond with incorrect username message
            return response.status(404).json({ message: "Incorrect Username" });
        }
    } catch (e) {
        // Respond with a server error message
        return response.status(500).json({ message: "Server Error" });
    }
});


app.post("/signup", async (request, response) => {

    const userDetails = request.body;

    console.log(userDetails)
    
    const {username, password} = userDetails

    const userObj = {username, password}

    const user = await Users.findOne({username : username})

    if(user){
        return response.status(200).json({message : "User already exists"})
    }

    // Here user doesn't exist so we need to create an account for him
    Users.insertMany([userObj])
    .then((result) => {
        
        return response.status(200).json({message : "SUCCESS"})
    })
    .catch((err) => {
        console.log(err)
    })
})


//to delete a note item

app.delete("/notes/:id", verifyToken, async (request, response) => {
    const {id} = request.params 
    const {username} = request.user 

    await Users.updateOne(
        {username : username},
        {$pull : {
            NotesList : {_id : id}
        }}
    )

    const userDetails = await Users.find({username : username})

    
})


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
