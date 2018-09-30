"use strict";

// create your own app on giphy
var API_KEY = "Uyif5WgGhFtXX7g8Dw0cN7UyiWNhRmdm"

var GphApiClient = require('giphy-js-sdk-core')
var client = GphApiClient(API_KEY)
var questions = [
  "When the code compiles without warnings or errors",
  "That feeling when the Soylent hits",
  "The face you make when you think of HackNY",
  "When your roomate won't stop talking",
  "After pulling an all-nighter",
  "When you forget your keys at home"
]
var starting_index = 0

function displayQuestion() {
  document.getElementById("question").innerHTML = questions[0]

  function getQuestion() {
    starting_index += 1
    if (starting_index == questions.length) {
      starting_index = 0
    }
    document.getElementById("question").innerHTML = questions[starting_index]
  }

  document.getElementById("next-question").addEventListener("click", getQuestion)
}

function getGIF() {
  /// Gif Search
  client.random('gifs', {})
  .then((response) => {

  })
  .catch((err) => {
    console.log("there is some error while loading the gif", err)
  })
}

(function() {
  displayQuestion();
  getGIF();
})();
