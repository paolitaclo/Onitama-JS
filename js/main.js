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
  let matFormat = '';
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
  $(".board").html(matFormat);
}




$(".play").on('click', function () {
  $(".btn-play").hide();
  $(".game-setup").show();
  addSquares(boardMatrix);
  // getAnimalPicRandomUrl('monkey');
});


function getRandomCards(allCardsArr) {//call the fn getRandomCards(cards) cards is in cards.js
  let deckCards = [];
  // .then(function (objAllCards) {
    while (deckCards.length < 5) {
      let cardRandom =  allCardsArr[randomNum(6)];
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
  const flickrUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4800d2269bf8ca945baf20ce930ea926&text=${animalName}&per_page=10&page=1&format=json&nojsoncallback=1&api_sig=a07d231b7df657149c9c74c55ce65f51`;
  return fetch(flickrUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (objOfPics) {
    // console.log(objOfPics);
    let arrOfAnimalPics = objOfPics.photos.photo.map(function (eachPic) {
      let infoAnimalPic = {};
      infoAnimalPic.farm = eachPic.farm;
      infoAnimalPic.server = eachPic.server;
      infoAnimalPic.id = eachPic.id;
      infoAnimalPic.secret = eachPic.secret;
      return infoAnimalPic;
    });
    console.log(arrOfAnimalPics);
  //   return arrOfAnimalPics;
  // })
  // .then(function (arrOfPicsObj) {
    let animalPicSelected = arrOfAnimalPics[randomNum(10)];//return an obj with the photo selected
    // console.log(animalPicSelected);
    let farm = animalPicSelected.farm; //refacture with destructuring
    let server = animalPicSelected.server;
    let id = animalPicSelected.id;
    let secret = animalPicSelected.secret;
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
  });
}

function getPicsForDeck(deckArray) {
  let randomDeck = getRandomCards();

  let url = getAnimalPicRandomUrl();
}










//
