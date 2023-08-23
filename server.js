const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let highScore = [];

app.use(bodyParser.json());

//Endpoint to retrieve high scores
app.get('/getHighScores', (req,res) => {
    res.json(highScores);
});

//Endpoint to submit a new score
app.post("/submitScore", (req,res)=>{
    const {playerName, score} = req.body;
    const newScore = {playerName, score};
    highScore.push(newScore);
    res.json(newScore);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})