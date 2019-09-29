'use strict';

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

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var mapContainer = document.querySelector('.map'); /* */
/* mapContainer.classList.remove('map--faded');/* */

var COORDINATE_MIN_X = 0 + PIN_WIDTH / 2;
var COORDINATE_MAX_X = mapContainer.offsetWidth - PIN_WIDTH / 2;
var COORDINATE_MIN_Y = 130;
var COORDINATE_MAX_Y = 630;

var getRandomElement = function (sourceArray, deleteCurrent) {
  var randomIndex = generateRandomValueInInterval(0, sourceArray.length - 1, true);
  if (!deleteCurrent) {
    return sourceArray[randomIndex];
  } else {
    return sourceArray.splice(randomIndex, 1)[0];
  }
};

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
    randomArray.push(getRandomElement(arrayCopy, true));
  }
  return randomArray;
};

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

var createOfferPins = function (offerCount) {
  var documentFragment = document.createDocumentFragment();
  var pinTempate = document.querySelector('#pin').content.querySelector('.map__pin');
  var offerList = generateOfferList(offerCount);
  for (var l = 0; l < offerCount; l++) {
    var newOffer = pinTempate.cloneNode(true);
    newOffer.style.left = (offerList[l].location.x - PIN_WIDTH / 2) + 'px';
    newOffer.style.top = (offerList[l].location.y - PIN_HEIGHT) + 'px';
    var pinImage = newOffer.querySelector('img');
    pinImage.src = offerList[l].author.avatar;
    pinImage.alt = offerList[l].offer.title;
    documentFragment.appendChild(newOffer);
  }
  return documentFragment;
};

var pinContainer = document.querySelector('.map__pins');
pinContainer.appendChild(createOfferPins(OFFER_COUNT));/* */

// Module3-task3

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var declinationCount = function (number, single, multiple) {
  if (number === 1) {
    return number + ' ' + single;
  } else {
    return number + ' ' + multiple;
  }
};

var deleteUnexistsItem = function (sourceElemement, sounseArray) {
  var m = 0;
  while (sourceElemement.children.length > sounseArray.length) {
    var classSubstring = sourceElemement.children[m].classList[1].substring(16);
    if (sounseArray.indexOf(classSubstring) === -1) {
      sourceElemement.children[m].remove();
    } else {
      m++;
    }
  }
};

var fillPopupPhotoContainer = function (newOfferCardClone, sourceArray) {
  var popupPhotoContainer = newOfferCardClone.querySelector('.popup__photos');
  var popupPhotoTemplate = popupPhotoContainer.querySelector('.popup__photo');
  for (var n = 0; n < sourceArray.length; n++) {
    if (n === 0) {
      popupPhotoTemplate.src = sourceArray[n];
    } else {
      var newPhoto = popupPhotoTemplate.cloneNode(true);
      newPhoto.src = sourceArray[n];
      popupPhotoContainer.appendChild(newPhoto);
    }
  }
};

var createOfferCards = function (offerCount) {
  var documentFragment = document.createDocumentFragment();
  var offerList = generateOfferList(offerCount);

  for (var k = 0; k < offerCount; k++) {
    var newOfferCard = cardTemplate.cloneNode(true);
    var apartmentTypeRus = APARTMENT_TYPE_VARIANTS_RUS[APARTMENT_TYPE_VARIANTS.indexOf(offerList[k].offer.type)];
    var cardFeaturesElementList = newOfferCard.querySelector('.popup__features');

    newOfferCard.querySelector('.popup__title').textContent = offerList[k].offer.title;
    newOfferCard.querySelector('.popup__text--address').textContent = offerList[k].offer.address;
    newOfferCard.querySelector('.popup__text--price').innerHTML = offerList[k].offer.price + '&#8381;/ночь';
    newOfferCard.querySelector('.popup__type').textContent = apartmentTypeRus;
    newOfferCard.querySelector('.popup__text--capacity').textContent = declinationCount(offerList[k].offer.rooms, 'комната', 'комнаты') + ' для ' + declinationCount(offerList[k].offer.guests, 'гостя', 'гостей');
    newOfferCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerList[k].offer.checkin + ', выезд до ' + offerList[k].offer.checkout;
    deleteUnexistsItem(cardFeaturesElementList, offerList[k].offer.features);
    newOfferCard.querySelector('.popup__description').textContent = offerList[k].offer.description;
    fillPopupPhotoContainer(newOfferCard, offerList[k].offer.photos);
    newOfferCard.querySelector('.popup__avatar').src = offerList[k].author.avatar;

    documentFragment.appendChild(newOfferCard);
  }
  return documentFragment;
};

var mapFiltersContainer = document.querySelector('.map__filters-container');
mapFiltersContainer.before(createOfferCards(OFFER_COUNT)); /* */

// module4-task2

var formElementDisableStatusChange = function (masterForm, selectorList, status) {
  for (var i = 0; i < selectorList.length; i++) {
    var elementList = masterForm.querySelectorAll(selectorList[i]);
    for (var j = 0; j < elementList.length; j++) {
      elementList[j].disabled = status;
    }
  }
};

var mainMapPin = document.querySelector('.map__pin--main');

var refreshAddressValue = function (element) {
  var elementParameters = {};
  elementParameters.Left = element.offsetLeft;
  elementParameters.Top = element.offsetTop;
  elementParameters.Width = element.offsetWidth;
  elementParameters.Height = element.offsetHeight;

  var POINTER_HEIGHT = 22;

  var formAdressInput = document.querySelector('#address');

  if (mapContainer.classList.contains('map--faded')) {
    formAdressInput.value = Math.round(elementParameters.Left + elementParameters.Width / 2) + ', ' + Math.round(elementParameters.Top + elementParameters.Height / 2);
  } else {
    formAdressInput.value = Math.round(elementParameters.Left + elementParameters.Width / 2) + ', ' + Math.round(elementParameters.Top + elementParameters.Height + POINTER_HEIGHT);
  }
}; /* */

var pageDisableStatusChange = function (disabled) {
  var newOfferForm = document.querySelector('.ad-form');
  if (mapContainer) {
    if (disabled) {
      mapContainer.classList.add('map--faded');
    } else {
      mapContainer.classList.remove('map--faded');
    }
  }
  if (newOfferForm) {
    if (disabled) {
      newOfferForm.classList.add('ad-form--disabled');
    } else {
      newOfferForm.classList.remove('ad-form--disabled');
    }
  }
  var formElementsSelectors = ['input', 'select', 'button', 'textarea'];
  var mapFiltersForm = document.querySelector('.map__filters');
  formElementDisableStatusChange(newOfferForm, formElementsSelectors, disabled);
  formElementDisableStatusChange(mapFiltersForm, formElementsSelectors, disabled);
  refreshAddressValue(mainMapPin);
};

pageDisableStatusChange(true);

mainMapPin.addEventListener('mousedown', function () {
  pageDisableStatusChange(false);
});

(function () {
  var formRoomNumberSelect = document.querySelector('#room_number');
  var formGuestCapacitySelect = document.querySelector('#capacity');

  if (formRoomNumberSelect.options.selectedIndex < 3) {
    formGuestCapacitySelect.options.selectedIndex = 2 - formRoomNumberSelect.options.selectedIndex;
  } else {
    formGuestCapacitySelect.options.selectedIndex = 3;
  }

  var checkRoomsGuestsBalance = function () {
    var abilityOptionIndexList = [];
    if (formRoomNumberSelect.options.selectedIndex < 3) {
      for (var i = 2; i >= 2 - formRoomNumberSelect.options.selectedIndex; i--) {
        abilityOptionIndexList.push(i);
      }
    } else {
      abilityOptionIndexList = [3];
    }

    if (abilityOptionIndexList.indexOf(formGuestCapacitySelect.options.selectedIndex) === -1) {
      var message = 'При выбранном количестве комнат: ' +
      formRoomNumberSelect.options[formRoomNumberSelect.options.selectedIndex].text +
      '; могут быть выбраны только следующие параметры: ';
      for (var j = 0; j < abilityOptionIndexList.length; j++) {
        if (j === 0) {
          message += formGuestCapacitySelect.options[abilityOptionIndexList[j]].text;
        } else {
          message += ', ' + formGuestCapacitySelect.options[abilityOptionIndexList[j]].text;
        }
      }
      formGuestCapacitySelect.setCustomValidity(message);
    } else {
      formGuestCapacitySelect.setCustomValidity('');
    }
  };

  formGuestCapacitySelect.addEventListener('change', checkRoomsGuestsBalance);
  formRoomNumberSelect.addEventListener('change', checkRoomsGuestsBalance);
})();
