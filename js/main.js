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
  cardsTurn: [],
  cardsOpponent: [],
  cardOnTable: undefined,
  boardOnTable: undefined,
  whosTurn: undefined,
  selectedCard: undefined,
  selectedPosition: undefined
};

$(".button-collapse").sideNav();
$(".game-setup").hide();

function addSquares(array, element) {
  let matFormat = '';
  if (element === '.middle-moveCard') {
    matFormat = '<div class="col s8 no-padding">'
  }
  if (element === '.board') {
    matFormat = '<div class="col s12">';
  }
  else{
    matFormat = '<div class="col s9 no-padding">';
  }
  for (var i = 0; i < array.length; i++) {
    matFormat += '<div class="row no-margin">';
    for (var j = 0; j < array[i].length; j++) {
      let blueOrRed = array[i][j];
      let classRedOrBlue;
      if (blueOrRed !== '' && blueOrRed !== 'O') {
      classRedOrBlue = (blueOrRed === 'r' || blueOrRed === 'RR') ? 'red' : 'blue';
      }

      let offset =  (j === 0) ? 'offset-s1' : '';
      matFormat += `<div class="col s2 ${offset} squares elem-${i}-${j} ${classRedOrBlue}">
      ${blueOrRed}</div>`;
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
  markMovePieces(game.whosTurn);
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
  const flickrUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9b9a89fb101e6d6923d3bf58aca31a97&text=${animalName}&per_page=10&page=1&format=json&nojsoncallback=1`;
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
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_q.jpg`;
  });
}

function getGameSetUp(arrOfDeckCards) {
  game.cardsTurn = [arrOfDeckCards[0], arrOfDeckCards[1]];
  game.cardsOpponent = [arrOfDeckCards[2], arrOfDeckCards[3]];
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

function markMovePieces(color) {
  $(`.${color}`).addClass('canMove');
}

function addInfoToCard(card, element) {//element w/classname top-A or top-B, middle-moveCard  ex: card=game.cardsTurn[0]
  getAnimalPicRandomUrl(card.name).then(function (url) {
    // console.log(card.name);
    $(element).find('.nameAnimal').text(card.name);
    // console.log($(element).find('.nameAnimal').text);
    $(element).find('.animalImage').attr("src", url);
    addSquares(boardMatrixCard, element);
    addPosMoveColor(element, [2,2], card.distance);
  })
}

function updateCardsOnTable() {
  addInfoToCard(game.cardsOpponent[0] ,'.top-A');
  addInfoToCard(game.cardsOpponent[1] ,'.top-B');
  addInfoToCard(game.cardsTurn[0] ,'.botton-A');
  addInfoToCard(game.cardsTurn[1] ,'.botton-B');
  addInfoToCard(game.cardOnTable ,'.middle-moveCard');
}

function getPositionsinCard(arrayOfTwo, arrOfDistances) {
  let sum = arrOfDistances.map(function (eachDistance) {
    return [arrayOfTwo[0] + eachDistance[0], arrayOfTwo[1] + eachDistance[1]];
  });
   let sumFiltered = sum.filter(function (eachArr) {
     return (eachArr[0] >= 0 && eachArr[0] < 5) && (eachArr[1] >= 0 && eachArr[1] < 5);
   });
   return sumFiltered;
}

function addPosMoveColor(matrixElement, moveFrom, cardDistanceList) {//delete the teal before gettin gin the for loop
  let positionInCard = getPositionsinCard(moveFrom, cardDistanceList);
  for (var i = 0; i < positionInCard.length; i++) {
    let pos = positionInCard[i];
    // console.log('position', pos);
    posIntoClass = `.elem-${pos[0]}-${pos[1]}`;
    $(matrixElement).find(posIntoClass).addClass('teal');
  }
}

function clearPreview(matrixElement) {
  $(matrixElement).find('.teal').removeClass('teal');
}

$('.deck-pl1 .card').on('click', function(event) {
  if ($(this).find('.botton-A').length > 0) {
    game.selectedCard = game.cardsTurn[0];
  } else {
    game.selectedCard = game.cardsTurn[1];
  }
});

$('.board').on('mouseenter mouseleave', '.canMove', function (event) {
  if (event.type === 'mouseleave') {
    clearPreview('.board');
  } else if (game.selectedCard !== undefined) {
    let classes = event.target.classList;
    let position = [];
    for (var i = 0; i < classes.length; i++) {
      if (classes[i].includes('elem-')) {
        position = [Number.parseInt(classes[i].charAt(5)),
        Number.parseInt(classes[i].charAt(7))];
        break;
      }
    }
    clearPreview('.board');
    addPosMoveColor('.board', position, game.selectedCard.distance);
  }
});



//
