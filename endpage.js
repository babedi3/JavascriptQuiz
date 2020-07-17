//Dom
const name = document.getElementById("name");
const saveScorebtn = document.getElementById("saveScoreBtn");
const newScore = localStorage.getItem("newScore");
const finalScore = document.getElementById("finalScore");

//JSON.parse converts the highscores into an array
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//Only holds 10 values in highscores list
const MAX_HIGHSCORE = 10;

finalScore.innerText = newScore;

//
name.addEventListener("keyup", () => {
    console.log(name.value);
})

saveHighScore = (e) => {
    //This below prevents the default action of posting to a different page
    e.preventDefault();

    const score = {
        score: Math.floor(Math.random() * 100),
        username: name.value
    };
    highScores.push(score);

    //Defining sort algorithm, sorting from highest to lowest score
    highScores.sort((a,b) => b.score - a.score);

    highScores.splice(10);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("index.html");
};




