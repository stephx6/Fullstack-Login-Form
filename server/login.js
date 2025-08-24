import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post("/login" ,(req , res) =>{
    const {username, password} = req.body;

    if(username === "carl" && password === "carl123"){
        res.json({success: true, username});
    }
    else{
        res.status(401).json({error: "Invalid Credentials"});
    }
});


app.listen(5000, () => console.log("Server running on http://localhost:5000"));