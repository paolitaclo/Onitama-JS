let boardMatrix = [
  ['x', 'x', 'XX', 'x', 'x'],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['o', 'o', 'OO', 'o', 'o']
];

$(".button-collapse").sideNav();
$(".game-setup").hide();

function addSquares(array) {
  let board = document.getElementsByClassName('board')[0];
  let matFormat = '';
  for (var i = 0; i < array.length; i++) {
    matFormat += '<div class="row no-margin">';
    for (var j = 0; j < array[i].length; j++) {
      if (j === 0) {
        matFormat += '<div class="col s2 offset-s1 squares">' + array[i][j] + '</div>';
      } else {
        matFormat += '<div class="col s2 squares">' + array[i][j] + '</div>';
      }
    }
    matFormat += '</div>';
  }
  board.innerHTML = matFormat;
}




$(".play").on('click', function () {
  $(".btn-play").hide();
  $(".game-setup").show();
  addSquares(boardMatrix);
});


function getRandomCards() {
  let deckCards = [];
  return fetch('js/cards.json').then(function (response) {
    return response.json();
  })
  .then(function (objAllCards) {
    while (deckCards.length < 5) {
      let cardRandom =  objAllCards.cards[randomNum()];
      if (deckCards.indexOf(cardRandom) === -1) {
        deckCards.push(cardRandom);
      }
    }
    console.log(deckCards);
    return deckCards;
  });
}

function randomNum() {
  return Math.floor(Math.random()*16);
}
