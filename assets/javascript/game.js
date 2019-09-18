// Array of space themed words
var wordOptions = ["galaxy","neptune","blackhole", "moon","eclipse","asteroid","jupiter","astronaut","telescope","Mercury"];
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var lettersGuessed = [];

//Assigning wins/guesses left the correct number
var wins = 0;
var guessesLeft = 10;

//Creating variables to hold the references to the place in the HTML where we want to display the results.
var directions = document.getElementById ("directions");
var wordGuessed = document.getElementById ("wordGuessed");
var winText = document.getElementById ("winText");
var guessRemainText = document.getElementById ("guessRemainText");
var letterGuessedText = document.getElementById ("letterGuessedText");

//FUNCTION: The below will loop again after the player successfully guesses the word.
    //Choose a word at random from the array.
    var randomWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];

    //Count the number of letters in the random string choosen.

    //Display "_ _ _ _" for each letter in the word in leiu of the word. FUNCTION: use a loop for this?

    //Player presses any letter to begin guessing.
    document.onkeyup = function(event) {

    //Store what button the player presses.
    var playerGuess = event.key;

    //Change player's input to lower case.

    //FUNCTION: use a loop to check if the player's input matches any of the letters in the string.

    //CONDITION: 
      // if the letter matches, disappear the "_" where the letter appears.
      // else, make the letter appear under letters guessed.
      //Move the letter from the alphabet vector to the empty vector.

    //Loop until the player successfully guesses the word, and automatically restart the game with a new random selection.
}