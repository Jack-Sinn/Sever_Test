document.addEventListener("DOMContentLoaded",()=>{
    const highScoreList = document.getElementById("highScoreList");
    const scoreForm = document.getElementById("scoreForm");

    //Fetch existing scores and populate the list
    fetch("/getHighScores")
        .then(response => response.json())
        .then(scores => {
            scores.forEach(score => {
                const listItem = document.createElement("li");
                listItem.textContent = `${score.playerName}: ${score.score}`;
                highScoreList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching high scores",error));
    //Submit form data to server
    scoreForm.addEventListener("submit", event => {
        event.preventDefault();

        const playerName = document.getElementById("playerName").value;
        const score = parseInt(document.getElementById("score").value);

        const data = {playerName, score};

        fetch("/submitScore",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(newScore => {
            const listItem = document.createElement('li');
            listItem.textContent = `${newScore.playerName}:${newScore.score}`;
            highScoreList.appendChild(listItem);
        })
        .catch(error => console.error('Error submitting score', error));
    });
});