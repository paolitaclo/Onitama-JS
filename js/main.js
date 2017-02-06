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
  getAnimalPicRandom('monkey');
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

function getAnimalPicRandom(animalName) { //string=> cards.name
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
    return arrOfAnimalPics;
  })
  .then(function (arrOfPicsObj) {
    let animalPicSelected = arrOfPicsObj[randomNum(10)];//return an obj with the photo selected
    console.log(animalPicSelected);
    let farm = animalPicSelected.farm; //refacture with destructuring
    let server = animalPicSelected.server;
    let id = animalPicSelected.id;
    let secret = animalPicSelected.secret;
    let img = '<img src="' +`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_s.jpg` + '" alt="">';
    console.log(img);
    $("#img-pl1").append(img);
  })
  .catch(function(err){
    console.log(err);
  })
}






// function getPicFlikr(arrayofRan) {//  result of getRandomCards =>arrayof 5 cards or newDeckCardsvariable
//   let picsPromisedArr = arrayofRan.map(function (card) {
//     return fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.
//     search&api_key=4800d2269bf8ca945baf20ce930ea926&text=${card.name}&per_page=10&
//     page=1&format=json&nojsoncallback=1&api_sig=a07d231b7df657149c9c74c55ce65f51`)
//   });//arr of obj, each obj is the search of 10 pics of the animal name
//   Promise.all(picsPromisedArr).then(function (animalPicsRes) {
//     return Promise.all(animalPicsRes.map(function (animalObj) {
//       console.log(animalObj);
//       return animalObj.json();
//     }));
//   })
//   .then(function (animalPics) {
//     return animalPics.photos.photo.map(function (eachAnimalPic) {
//       let infoAnimalPic = {};
//       infoAnimalPic.farm = farm;
//       infoAnimalPic.server = server;
//       infoAnimalPic.id = id;
//       infoAnimalPic.secret = secret;
//       return infoAnimalPic;
//     });
//   })
//   .then(function (arrAnimalInfo) {
//
//   })
//
//
//
//   let urlPic = `https://farm${farm-id}.staticflickr.com/${server-id}/${id}_${secret}_s.jpg`;
// }






//
