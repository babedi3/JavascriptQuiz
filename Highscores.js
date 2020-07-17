//Dom
const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//.map takes an array of items and in this code converts data into a string
highScoresList.innerHTML = highScores
    .map( score => {
        //here I am using template literals with the grave accent in order to use embedded expressions
        return `<li class="high-score">${score.username} - ${score.score}</li>`;
    })
    .join("");