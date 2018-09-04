

 // define the words that the computer can choose from.
 var computerChoices = [
    "Metallica", 
    "Eagles", 
    "Aerosmith", 
    "Nirvana"
];

// create variables to hold game results
var wins = 0;
var losses = 0;
var hiddenName = [];
var userChoices = [];
var userPick = "";
var guessesRemaining = 10;
var gameOver = false;
var computerGuess = "";

// create variables that hold reference to DOM objects
var directionsText = document.getElementById("directions-text");
var computerWordText = document.getElementById("computerword-text"); 
var lettersGuessedText = document.getElementById("lettersguessed-text");
var winsText = document.getElementById("wins-text");
var guessesRemainingText = document.getElementById("guessesremaining-text");


restartGame();

//reset game variables
function restartGame() {

    

   // Get random Computer choice of words
    // computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];


    hiddenName = [];
    userChoices = [];
    userPick = "";
    losses = 0;
    wins = 0;
    guessesRemaining = 10;

    computerWordText.textContent = "";
    lettersGuessedText.textContent = "";
    winsText.textContent = "";
    guessesRemainingText.textContent = "";

    getRandomChoice();
    // create appropriate display
    createDisplay();
}

// change display by manipulating DOM objects
function createDisplay() {

    winsText.textContent = wins;

    
    
    if (gameOver) {
        getRandomChoice();
        directionsText.textContent = "Press any key to play again";

        gameOver = false;
    }
    else {
        directionsText.textContent = "Press any letter to start";
    }
    
    lettersGuessedText.textContent = userChoices;
    guessesRemainingText.textContent = guessesRemaining; 
    computerWordText.textContent = hiddenName.join("  ");
    if (guessesRemaining <= 0) {
        directionsText.textContent = "Press any key to play again";
    }
}

// get a random computer choice and clear the old choice
function getRandomChoice() {
    userChoices = [];
    computerGuess = [];
    hiddenName = [];
    guessesRemaining = 10;

    // Get random Computer choice of words
    computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];

    for (i=0; i < computerGuess.length; i++) {
        hiddenName[i] =  "_";
    }


}

// listener for user to press a key.

document.onkeyup = function(event) {
    document.getElementById("winnerImg").src = "";
    // if user presses a key to play again.
    if (gameOver) {
        createDisplay();
        gameOver = false;
    } 
    else {
        // ignore all keys except letters
        if (event.keyCode >= 65 && event.keyCode <= 90 ) {
            processGuess(event.key.toLowerCase());

        }
    } 
}

function processGuess(letter) {
    // if letter has not been guessed yet then add to guessed letter array and process.
   
    var x = userChoices.indexOf(letter);

    if (x === -1) {
        userChoices.push(letter);
        
        // if the user's pick is in the word chosen by the computer then fill in the letter.
        var letterFound = false;
        for (i = 0; i < computerGuess.length; i++) {
            if (computerGuess[i] === letter.toLowerCase() || computerGuess[i] === letter.toUpperCase()) {
                hiddenName[i] = computerGuess[i];
                letterFound = true;
            }
            
        }
        // if letter wasn't found the decrease remaining guesses by 1.
        if (!letterFound) {
            guessesRemaining--;
            if (guessesRemaining <= 0) {
                gameOver = true;
            }
        } 
    }
    checkForWin();
    createDisplay();
}

function checkForWin() {
    //if there are no more underscores in the hiddenName array then increase wins by 1 and start a new game
    x = hiddenName.indexOf("_");
    if (x === -1) {
        wins++;
        document.getElementById("winnerImg").src = "assets/images/Winner-PNG-File.png";
        gameOver = true;
    }

}