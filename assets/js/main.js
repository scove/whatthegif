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

function parseURL(url) {
  var result = ""
  var scheme = ""

  if (url.substr(0, 8) === "https://") {
    scheme = "https://"
    url = url.slice(8)
  } else if (url.substr(0, 7) === "http://") {
    scheme = "http://"
    url = url.slice(7)
  }

  var components = url.split('/')
  var hostname = components[0]
  var path = components[1]
  var gifIdPath = components[2]
  var gifIdArr = gifIdPath.split('-')
  var gifId = gifIdArr[gifIdArr.length - 1]

  result = scheme + hostname + '/embed/' + gifId

  return result
}

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
    var gifURL = response.data.url
    if (!gifURL) {
      console.log('There is no such thing dude! :(')
    }
    var embeddedGifURL = parseURL(gifURL)
    var div = document.createElement('div')
    div.className = 'gif-img'
    div.innerHTML =
      '<iframe src="' + embeddedGifURL + '"\
               width="469" height="480"\
               frameBorder="0" class="giphy-embed"\
               allowFullScreen></iframe>\
      <p>\
        <a href="' + gifURL + '">\
          via GIPHY\
        </a>\
      </p>'

    document.getElementById('gif-result-container').appendChild(div)
  })
  .catch((err) => {
    console.log('There is some error while trying to get your gif: ', err, ':(')
  })

}

function getGifButton() {
  document.getElementById('search-gif').addEventListener("click", processSearchGIF)
}

function initScrore() {
  document.getElementById('player1-score').innerHTML = 0
  document.getElementById('player2-score').innerHTML = 0
}

function incrementScore(currPlayerId) {
  var currScore = parseInt(document.getElementById(currPlayerId).innerHTML)
  document.getElementById(currPlayerId).innerHTML = currScore + 1
}

function incrementScoreAction(playerButtonId) {
  var playerScoreId = ""
  if (playerButtonId === "increment-1") {
    playerScoreId = "player1-score"
  } else {
    playerScoreId = "player2-score"
  }
  document.getElementById(playerButtonId).addEventListener("click", function() {
    incrementScore(playerScoreId)
  })
}

function clearGif() {
  document.getElementById('clear-gif').addEventListener('click', function() {
    document.getElementById('gif-result-container').innerHTML = ''
    document.getElementById('gif-result').classList.add("hidden")
  })
}

function showGIF() {
  document.getElementById('show-gif').addEventListener('click', function() {
    document.getElementById('gif-result').classList.remove("hidden")
  })
}

(function() {
  displayQuestion();
  getGifButton();
  initScrore();
  incrementScoreAction('increment-1')
  incrementScoreAction('increment-2')
  clearGif()
  showGIF()
})();
