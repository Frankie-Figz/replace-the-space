// ===================================================================
// GLOBAL ARRAYS
// ===================================================================
var wordOptions = ["galaxy","neptune","blackhole", "moon","eclipse","asteroid","jupiter","astronaut","telescope","mercury","density","saturn","mars","sun","star","comet","venus","uranus","earth","space","pluto","astronomy","equinox"];
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var lettersGuessed = [];
var incorrectGuesses = [];
// ===================================================================
// GLOBAL VARIABLES
// ===================================================================
var wins = 0;
var losses = 0;
var guessesLeft = 5;
var maxLength = 10;
var hasHit = false;
var randomWord = "";
var wordLength = 0;
var userPlay;
var userReplay;
var gameOver;
// ===================================================================
// HTML ELEMENT VARIABLES
// ===================================================================
var directionsText = document.getElementById ("directions");
var wordGuessed = document.getElementById ("wordGuessed");
var winText = document.getElementById ("winText");
var loseText = document.getElementById ("loseText");
var guessRemainText = document.getElementById ("guessRemainText");
var letterGuessedText = document.getElementById ("letterGuessedText");
var playButtonClick = document.getElementById ("play");
var modal = document.getElementById("modal");
var modalTitle = document.getElementById("modal-title");
// ===================================================================
// FUNCTIONS
// ===================================================================
// Blank Space Function
var blankSpaceFunction = function(word) {
  // New logic
  // Iterates through all the possible spaces.   var blanks = document.getElementById("blanks");
  blanks.innerHTML = "";  
  for(var i in word){
    var newBlank = document.createElement("div");
    newBlank.innerText = "";
    newBlank.id = "b"+i;
    newBlank.className = "blank";
    blanks.append(newBlank);
  }
}
// ===================================================================
// Valid Input Function
var validInputFunction = function(s) {
  if(alphabet.includes(s) && !lettersGuessed.includes(s))
    return true
  else
    return false
};
// ===================================================================
// Comparison Function
var comparisonFunction = function(w) {
  // Get the letters within the string being guessed and compares the letter to the letters in the array
  lettersGuessed.push(w);
  for (var str = 0; str < randomWord.length; str++){
    // Print the letter in the array to the blank space, and push the user's guess to the letters guessed array. 
    if (w == randomWord[str]) {
      var letter = document.getElementById("b" + str);
      letter.textContent = w;
      wordLength--;
      hasHit = true;
    };
  };
  // If guessed letter is not in the word, -1 guesses left, push the user's guess to letters guessed array and print the wrong letters guessed for the user to see.
  if ((hasHit == false) && (guessesLeft > 0)){
    incorrectGuesses.push(w);
    guessesLeft--;
    letterGuessedText.textContent = "LETTERS GUESSED: " + incorrectGuesses.toString();
    guessRemainText.textContent = "GUESSES LEFT: " + guessesLeft;
  };
  hasHit = false;
};
// ===================================================================
// Play Function
var initialize = function(){
  directionsText.textContent = "";
  randomWord = "";
  gameOver = false;
  lettersGuessed = [];
  incorrectGuesses = [];

  // Get a random word from the Word Options array
  randomWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  
  // Send the random word to the blank space function.
  blankSpaceFunction(randomWord);
  
  // Set up our initial values
  wordLength = randomWord.length;
  guessesLeft = 5;
  letterGuessedText.textContent = "LETTERS GUESSED: " + incorrectGuesses;
  guessRemainText.textContent = "GUESSES LEFT: " + guessesLeft;
  
  // Replay
  if (userPlay == false){
    return userReplay;
  };
};
// ===================================================================
// Play Button Click Function
document.addEventListener('click', function (event) {
  if (!event.target.matches('#play')) return;
  directionsText.style.visibility = "hidden";
  playButtonClick.style.visibility = "hidden";
  userPlay = true;
  game();
});
// ===================================================================
// Replay Button Click Function
document.addEventListener('click', function (event) {
  if (!event.target.matches('#play-again')) return;
  $('#modal').modal('hide');
  userReplay = true;
  initialize();
});
// ===================================================================
// Exit Button Click Function
document.addEventListener('click', function (event) {
  if (!event.target.matches('#exit-game')) return;
  userReplay = false;
  directionsText.textContent = "";
  randomWord = "";
  modalTitle.textContent = "Thanks for playing.";
  document.getElementById("play-again").style.visibility = "hidden";
  document.getElementById("exit-game").style.visibility = "hidden";
});
// ===================================================================
// GAME
// ===================================================================
directionsText.textContent = "Press play to begin";
var game = function() { 
  if ((userPlay == true) || (userReplay == true)) {
    
    // Initializes our values for play and replay.
    initialize();
    userPlay = false;
    // Continue Guessing Condition:
    if (guessesLeft > 0) {
      
      // User presses a key:
      document.onkeyup = function(event) {
        var userGuess = event.key.toLowerCase();
        
        // Check if key pressed is valid
        var validInput = validInputFunction(userGuess);
        
        // Validity Condition
        if (validInput == true){
          // If valid pass for comparison to random word
          comparisonFunction(userGuess);
        };

        // Lose Condition:
        if (guessesLeft <= 0 && gameOver == false){
          losses++;
          gameOver = true;
          loseText.textContent = "LOSSES: " + losses;
          modalTitle.textContent = "You lose. The answer was " + randomWord + ".";
          $('#modal').modal({visibility: 'show', backdrop: 'static', keyboard: false});
        };
        
        // Win Condition:
        if (wordLength == 0 && gameOver == false) {
          wins++;
          gameOver = true;
          winText.textContent = "WINS: " + wins;
          modalTitle.textContent = "You win!";
          $('#modal').modal({visibility: 'show', backdrop: 'static', keyboard: false});
        };
      };
    };
  };
};
// ===================================================================