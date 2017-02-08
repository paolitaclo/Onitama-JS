let initialBoardMatrix = [
  ['r', 'r', 'RR', 'r', 'r'],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['b', 'b', 'BB', 'b', 'b']
];

let boardMatrixCard = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', 'O', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
];

let game = {
  cardsPlayerBlue: [],
  cardsPlayerRed: [],
  cardOnTable: undefined,
  boardOnTable: undefined,
  whosTurn: undefined
};

$(".button-collapse").sideNav();
$(".game-setup").hide();

function addSquares(array, element) {
  let matFormat = '<div class="col s9">';
  for (var i = 0; i < array.length; i++) {
    matFormat += '<div class="row no-margin">';
    for (var j = 0; j < array[i].length; j++) {
      if (j === 0) {
        matFormat += '<div class="col s2 offset-s1 squares">' + array[i][j]
        + '</div>';
      } else {
        matFormat += '<div class="col s2 squares">' + array[i][j] + '</div>';
      }
    }
    matFormat += '</div>';
  }
  matFormat += '</div>';
  $(element).prepend(matFormat);
}

$(".play").on('click', function () {
  $(".btn-play").hide();
  $(".game-setup").show();
  getGameSetUp(getRandomCards(cards));
  addSquares(game.boardOnTable, ".board");
  $(".board").css('background-color', game.whosTurn);
  updateCardsOnTable();
  // addSquares(boardMatrixCard, ".move-card");
  // getAnimalPicRandomUrl('monkey');
  //$(".name-card-animal").append(game.cardOnTable.name);// => this will be replaced with addNameToMCard fn
});
//

function getRandomCards(allCardsArr) {//call the fn getRandomCards(cards) cards is in cards.js
  let deckCards = [];
  // .then(function (objAllCards) {
    while (deckCards.length < 5) {
      let cardRandom =  allCardsArr[randomNum(16)];
      if (deckCards.indexOf(cardRandom) === -1) {
        deckCards.push(cardRandom);
      }
    }
    return deckCards;
}

function randomNum(num) {
  return Math.floor(Math.random()*num);
}

//let newDeckCards = getRandomCards(cards);//ask if this is a good idea

function getAnimalPicRandomUrl(animalName) { //string=> cards.name
  const flickrUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0b5a22cb21a4ac196a52464e10e34baf&text=${animalName}&per_page=10&page=1&format=json&nojsoncallback=1&263044609580b133757421d399d73606`;
  return fetch(flickrUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (objOfPics) {
    //  console.log(objOfPics);
    let arrOfAnimalPics = objOfPics.photos.photo.map(function (eachPic) {
      let infoAnimalPic = {};
      infoAnimalPic.farm = eachPic.farm;
      infoAnimalPic.server = eachPic.server;
      infoAnimalPic.id = eachPic.id;
      infoAnimalPic.secret = eachPic.secret;
      return infoAnimalPic;
    });
    // console.log(arrOfAnimalPics);
  //   return arrOfAnimalPics;
  // })
  // .then(function (arrOfPicsObj) {
    let animalPicSelected = arrOfAnimalPics[randomNum(10)];//return an obj with the photo selected
    // console.log(animalPicSelected);
    let farm = animalPicSelected.farm; //refacture with destructuring
    let server = animalPicSelected.server;
    let id = animalPicSelected.id;
    let secret = animalPicSelected.secret;
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_s.jpg`;
  });
}

function getGameSetUp(arrOfDeckCards) {
  game.cardsPlayerBlue.push(arrOfDeckCards[0], arrOfDeckCards[1]);
  game.cardsPlayerRed.push(arrOfDeckCards[2], arrOfDeckCards[3]);
  game.cardOnTable = arrOfDeckCards[4];
  game.whosTurn = arrOfDeckCards[4].color;
  game.boardOnTable = initialBoardMatrix.map(function (subArray) {
    return subArray.slice();
  });
  if (game.whosTurn === 'red') {
    game.boardOnTable = rotateBoard(game.boardOnTable);
  }
  return game;
}

function rotateBoard (arrBoard) {
  let arrRotated = arrBoard.map(function(row) {
    return row.reverse();
  });
  return arrRotated.reverse();
}

function addInfoToCard(card, element) {//element w/classname top-A or top-B, middle-moveCard  ex: card=game.cardsPlayerBlue[0]
  getAnimalPicRandomUrl(card.name).then(function (url) {
    console.log(card.name);
    $(element).find('.nameAnimal').text(card.name);
    console.log($(element).find('.nameAnimal').text);
    $(element).find('.animalImage').attr("src", url);
    addSquares(boardMatrixCard, element);
  })
}

function updateCardsOnTable() {
  addInfoToCard(game.cardsPlayerBlue[0] ,'.top-A');
  addInfoToCard(game.cardsPlayerBlue[1] ,'.top-B');
  addInfoToCard(game.cardsPlayerRed[0] ,'.botton-A');
  addInfoToCard(game.cardsPlayerRed[1] ,'.botton-B');
  addInfoToCard(game.cardOnTable ,'.middle-moveCard');
}
//
