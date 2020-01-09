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
  // Iterates through all the possible spaces. 
  for(var i = 0; i < maxLength; i++){
    var space = document.getElementById("b" + i);
    space.textContent = "";
    space.style.visibility = (i < word.length ? "visible" : "hidden");
  }

  // Old logic
  // Makes blank space invisible
  // for (var h = word.length; h < maxLength; h++){
  //   var space = document.getElementById("b" + h);
  //   space.style.visibility = "hidden";
  //   space.textContent = "";
  // };
  
  // // Makes blank space visible
  // for (var v = 0; v < word.length; v++){
  //   var space = document.getElementById("b" + v);
  //   space.style.visibility = "visible";
  //   space.textContent = "";
  // };
};
// ===================================================================
// Valid Input Function
var validInputFunction = function(s) {
  // New logic ::
  // The key pressed should be included in the alphabet AND must NOT be included in the guessed list to be a valid input.
  if(alphabet.includes(s) && !lettersGuessed.includes(s))
    return true
  else
    return false
  // Old logic : First check if the key pressed is in the guessed. 
  // Second check if the key pressed is valid; if it is not valid return false else return true.
  // if (lettersGuessed.length > 0 && lettersGuessed.includes(s)){
  //     return false;
  // }
  // else if (alphabet.includes(s)){
  //   return true;
  // } 
  // else {
  //   return false;
  // };

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
// Reset Array Function
// var resetArrayFunction = function (){
//   alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
//   lettersGuessed = [];
//   incorrectGuesses = [];
// };
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
  // resetArrayFunction();
  initialize();
});
// ===================================================================
// Exit Button Click Function
document.addEventListener('click', function (event) {
  if (!event.target.matches('#exit-game')) return;
  userReplay = false;
  // resetArrayFunction();
  directionsText.textContent = "";
  randomWord = "";
  modalTitle.textContent = "Thanks for playing.";
  // Hides the play again and exit game button from user
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
        var userGuess = event.key;
        
        // Changes the users guess to lower case
        var userGuessLow = userGuess.toLowerCase();
        
        // Check if key pressed is valid
        var validInput = validInputFunction(userGuessLow);
        
        // Validity Condition
        if (validInput == true){
          // If valid pass for comparison to random word
          comparisonFunction(userGuessLow);
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