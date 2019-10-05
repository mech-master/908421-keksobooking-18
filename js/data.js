'use strict';

(function () {
  var OFFER_COUNT = 8;
  var APARTMENT_TYPE_VARIANTS = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var APARTMENT_TYPE_VARIANTS_RUS = [
    'Дворец',
    'Квартира',
    'Дом',
    'Бунгало'
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

  var generateRandomValueInInterval = function (minValue, maxValue, isInteger) {
    var result = minValue + Math.random() * (maxValue - minValue);
    if (isInteger) {
      result = Math.round(result);
    }
    return result;
  };

  var getRandomElement = function (sourceArray, deleteCurrent) {
    var randomIndex = generateRandomValueInInterval(0, sourceArray.length - 1, true);
    if (!deleteCurrent) {
      return sourceArray[randomIndex];
    } else {
      return sourceArray.splice(randomIndex, 1)[0];
    }
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
      randomArray.push(getRandomElement(arrayCopy, true));
    }
    return randomArray;
  };

  var mapContainer = document.querySelector('.map');

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var COORDINATE_MIN_X = 0 + PIN_WIDTH / 2;
  var COORDINATE_MAX_X = mapContainer.offsetWidth - PIN_WIDTH / 2;
  var COORDINATE_MIN_Y = 130;
  var COORDINATE_MAX_Y = 630;

  var generateOfferList = function (count) {
    var newOfferList = [];
    var avatarList = generateAvatarList(count);

    for (var j = 0; j < count; j++) {
      var newOfferItem = {};
      var newAuthorAvatar = getRandomElement(avatarList, true);
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
        price: generateRandomValueInInterval(1000, 100000, true),
        type: getRandomElement(APARTMENT_TYPE_VARIANTS, false),
        rooms: generateRandomValueInInterval(1, 4, true),
        guests: generateRandomValueInInterval(1, 3, true),
        checkin: getRandomElement(CHECKIN_TIME_VARIANTS, false),
        checkout: getRandomElement(CHECKOUT_TIME_VARIANTS, false),
        features: featureList,
        description: '{{Описание}}',
        photos: photoList
      };

      newOfferList.push(newOfferItem);
    }

    return newOfferList;
  };

  var offerList = generateOfferList(OFFER_COUNT);

  window.data = {
    OFFER_COUNT: OFFER_COUNT,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    offerList: offerList,
    APARTMENT_TYPE_VARIANTS: APARTMENT_TYPE_VARIANTS,
    APARTMENT_TYPE_VARIANTS_RUS: APARTMENT_TYPE_VARIANTS_RUS
  };
})();

