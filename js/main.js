'use strict';

var OFFER_COUNT = 8;
var APARTMENT_TYPE_VARIANTS = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var CHECKIN_TIME_VARIANTS = [
  '12:00',
  '13:00',
  '14:00,'
];

var CHECKOUT_TIME_VARIANTS = [
  '12:00',
  '13:00',
  '14:00,'
];

var APARTMENT_OPTIONAL_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var APARTMENT_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var COORDINATE_MIN_X = 0;
var COORDINATE_MAX_X = 1200;
var COORDINATE_MIN_Y = 130;
var COORDINATE_MAX_Y = 630;

var generateRandomValueInInterval = function (minValue, maxValue, isInteger) {
  var result = minValue + Math.random() * (maxValue - minValue);
  if (isInteger) {
    result = Math.round(result);
  }
  return result;
};

var generateAvatarList = function (count) {
  var newAvatarList = [];

  for (var i = 1; i <= count; i++) {
    newAvatarList.push('img/avatars/user0' + i + '.png');
  }
  return newAvatarList;
};

var generateArrayRandomLength = function (sourceArray) {
  var randomLength = generateRandomValueInInterval(1, sourceArray.length, true);
  var arrayCopy = sourceArray.slice();
  var randomArray = [];
  for (var k = 1; k <= randomLength; k++) {
    var randomIndex = generateRandomValueInInterval(0, arrayCopy.length - 1, true);
    randomArray.push(arrayCopy.splice(randomIndex, 1)[0]);
  }
  return randomArray;
};

var generateOfferList = function (count) {
  var newOfferList = [];
  var avatarList = generateAvatarList(count);

  for (var j = 0; j < count; j++) {
    var newOfferItem = {};
    var randomAvatarIndex = Math.round(Math.random() * (avatarList.length - 1));
    var newAuthorAvatar = avatarList.splice(randomAvatarIndex, 1)[0];
    var featureList = generateArrayRandomLength(APARTMENT_OPTIONAL_FEATURES);
    var photoList = generateArrayRandomLength(APARTMENT_PHOTOS);

    newOfferItem.author = {avatar: newAuthorAvatar};
    newOfferItem.location = {
      x: generateRandomValueInInterval(COORDINATE_MIN_X, COORDINATE_MAX_X, true),
      y: generateRandomValueInInterval(COORDINATE_MIN_Y, COORDINATE_MAX_Y, true)
    };
    newOfferItem.offer = {
      title: '{{Заголовок предложения' + (j + 1) + '}}',
      address: newOfferItem.location.x.toString() + ', ' + newOfferItem.location.y.toString(),
      price: generateRandomValueInInterval(100, 1000, true),
      type: APARTMENT_TYPE_VARIANTS[generateRandomValueInInterval(0, APARTMENT_TYPE_VARIANTS.length - 1, true)],
      rooms: generateRandomValueInInterval(1, 4, true),
      guests: generateRandomValueInInterval(1, 3, true),
      checkin: CHECKIN_TIME_VARIANTS[generateRandomValueInInterval(0, CHECKIN_TIME_VARIANTS.length - 1, true)],
      checkout: CHECKOUT_TIME_VARIANTS[generateRandomValueInInterval(0, CHECKOUT_TIME_VARIANTS.length - 1, true)],
      features: featureList,
      description: '{{Описание}}',
      photos: photoList
    };

    newOfferList.push(newOfferItem);
  }

  return newOfferList;
};

var mapContainer = document.querySelector('.map');
mapContainer.classList.remove('map--faded');

var createOfferPins = function (offerCount) {
  var documentFragment = document.createDocumentFragment();
  var pinTempate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinWIdth = pinTempate.style.width;
  var pinHeight = pinTempate.style.height;

  var offerList = generateOfferList(offerCount);
  for (var l = 0; l < offerCount; l++) {
    var newOffer = pinTempate.cloneNode(true);
    newOffer.style.left = (offerList[l].location.x - pinWIdth / 2) + 'px';
    newOffer.style.top = (offerList[l].location.y - pinHeight) + 'px';
    var pinImage = newOffer.querySelector('img');
    pinImage.src = offerList[l].author.avatar;
    pinImage.alt = offerList[l].offer.title;
    documentFragment.appendChild(newOffer);
  }
  return documentFragment;
};

var pinContainer = document.querySelector('.map__pins');
pinContainer.appendChild(createOfferPins(OFFER_COUNT));
