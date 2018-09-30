"use strict";

// create your own app on giphy
var API_KEY = ""

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

function processSearchGIF() {
  var keyword = document.getElementById('searchbox-gif').value

  // client.search('gifs', {"q": keyword})
  // .then((response) => {
  //   response.data.forEach((gifObject) => {
  //     console.log
  //   })
  // })
  // .catch((err) => {
  //
  // })

  client.random('gifs', {"tag": keyword})
  .then((response) => {
    // TODO: ask to see if we can get the embedded version here
    // var gifURL = response.data.url
    // var div = document.createElement('div')
    // div.className = 'gif-img';
    // div.innerHTML = '<img src="' + gifURL + '">'
    //
    // document.getElementById('gif-result').appendChild(div)
  })
  .catch((err) => {

  })

}

function getGifButton() {
  document.getElementById('search-gif').addEventListener("click", processSearchGIF)
}

(function() {
  displayQuestion();
  getGifButton();
})();
