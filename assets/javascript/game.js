// Various arrays
var wordOptions = ["galaxy","neptune","blackhole", "moon","eclipse","asteroid","jupiter","astronaut","telescope","Mercury"];
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var lettersGuessed = [];
var incorrectGuesses = [];
var wordsGuessed = [];

//Assigning wins/guesses left the correct number
var wins = 0;
var losses = 0;
var guessesLeft = 1;
var maxLength = 9;
var hasHit = false;

//Creating variables to hold the references to the place in the HTML where we want to display the results.
var directions = document.getElementById ("directions");
var wordGuessed = document.getElementById ("wordGuessed");
var winText = document.getElementById ("winText");
var loseText = document.getElementById ("loseText");
var guessRemainText = document.getElementById ("guessRemainText");
var letterGuessedText = document.getElementById ("letterGuessedText");

//FUNCTIONS ===========================================

//Blank Space Function
var blankSpaceFunction = function(word) {
  
  //Makes blank space visible
  for (var v = 0; v < word.length; v++){
    var space = document.getElementById("b" + v);
    space.style.visibility = "visible";
  }
  
  var blank = maxLength - word.length;
  
  //Makes blank space invisible
  for (var h = blank + 1; h <= blank; h++){
    var space = document.getElementById("b" + h);
    space.style.visibility = "hidden";
  }
}

//Valid Input Function
var validInputFunction = function(s) {
  if (lettersGuessed.length > 0){
    if (lettersGuessed.includes(s)){
      return false;
    }
  }
  if (alphabet.includes(s)){
    return true;
  } 
  else {
    return false;
  }
}

//Comparison Function
var comparisonFunction = function(w) {
  //Get the letters within the string being guessed and ompare the letter to the letters in the array
  lettersGuessed.push(w);
  for (var str = 0; str < randomWord.length; str++){
    //Print the letter in the array to the blank space, and push the user's guess to the letters guessed array. 
    if (w == randomWord[str]) {
      var letter = document.getElementById("b" + str);
      letter.textContent = w;
      wordLength--;
      hasHit = true;
    }
  }
  //If guessed letter is not in the word, -1 guesses left, push the user's guess to letters guessed array and print the wrong letters guessed for the user to see.
  if ((hasHit == false) && (guessesLeft > 0)){
    incorrectGuesses.push(w);
    guessesLeft--;
    letterGuessedText.textContent = "Letters Guessed: " + incorrectGuesses.toString();
    guessRemainText.textContent = "Guesses Left: " + guessesLeft;
  }
  hasHit = false;
}

//Restart Game Function
//reset the letters guessed.
//send back to the random word generator.

//START GAME ========================================

//Asks the player if they want to play the game.
var userPlay = confirm("Do you want to play a game of Replace the Space?");
if (userPlay == true) {
  
  //Add directions: "Press a key to begin guessing the word."
  //

  //Get a random word from the Word Options array
  var randomWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  console.log(randomWord);
  var wordLength = randomWord.length;
  //Send the random word to the blank space function.
  blankSpaceFunction(randomWord);
  
  //Continue Guessing Condition:
  if (guessesLeft > 0) {
    
    //User presses a key:
    document.onkeyup = function(event){
      var userGuess = event.key;
      
      //Changes the users guess to lower case
      var userGuessLow = userGuess.toLowerCase();
      
      //Check if key pressed is valid
      var validInput = validInputFunction(userGuessLow);
      // console.log(validInput);
      
      //Validity Condition
      if (validInput == true){
        //If valid pass for comparison to random word
        comparisonFunction(userGuessLow);
      }

      //Lose Condition:
      if (guessesLeft <= 0){
        //function that checks on the status of the game to break the code or end the game
        alert ("You lose.");
        losses++;
        loseText.textContent = "Losses: " + losses;
        //Restart game function
      }
      
      //Winning Condition:
      if (wordLength == 0) {
        alert ("You win!");
        wins++;
        winText.textContent = "Wins: " + wins;
        //Restart game function
      }
    }
  }
//If they player doesn't want to play, quit. 
} else {
  alert("Fine. I didn't want to play with you, anyways.")
}

//END OF GAME =============================================================