'use strict';

(function () {
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
    if (!sourceArray.length) {
      popupPhotoTemplate.remove();
    } else {
      for (var n = 0; n < sourceArray.length; n++) {
        if (n) {
          var newPhoto = popupPhotoTemplate.cloneNode(true);
          newPhoto.src = sourceArray[n];
          popupPhotoContainer.appendChild(newPhoto);
        } else {
          popupPhotoTemplate.src = sourceArray[n];
        }
      }
    }
  };

  var createOfferCards = function (offerItem) {
    var newOfferCard = cardTemplate.cloneNode(true);
    var apartmentTypeRus = window.data.APARTMENT_TYPE_VARIANTS_RUS[window.data.APARTMENT_TYPE_VARIANTS.indexOf(offerItem.offer.type)];
    var cardFeaturesElementList = newOfferCard.querySelector('.popup__features');
    var buttonCardClose = newOfferCard.querySelector('.popup__close');
    var ENTER_KEYCODE = 13;
    var ESC_KEYCODE = 27;

    var onCrossCardClose = function (evt) {
      if ((evt.type === 'click') || (evt.type === 'keydown' && evt.keyCode === ENTER_KEYCODE)) {
        newOfferCard.remove();
      }
    };

    var onEscCardClose = function (evt) {
      if ((evt.type === 'keydown') && (evt.keyCode === ESC_KEYCODE)) {
        newOfferCard.remove();
      }
    };

    newOfferCard.querySelector('.popup__title').textContent = offerItem.offer.title;
    newOfferCard.querySelector('.popup__text--address').textContent = offerItem.offer.address;
    newOfferCard.querySelector('.popup__text--price').innerHTML = offerItem.offer.price + '&#8381;/ночь';
    newOfferCard.querySelector('.popup__type').textContent = apartmentTypeRus;
    newOfferCard.querySelector('.popup__text--capacity').textContent = declinationCount(offerItem.offer.rooms, 'комната', 'комнаты') + ' для ' + declinationCount(offerItem.offer.guests, 'гостя', 'гостей');
    newOfferCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;
    deleteUnexistsItem(cardFeaturesElementList, offerItem.offer.features);
    newOfferCard.querySelector('.popup__description').textContent = offerItem.offer.description;
    fillPopupPhotoContainer(newOfferCard, offerItem.offer.photos);
    newOfferCard.querySelector('.popup__avatar').src = offerItem.author.avatar;

    buttonCardClose.addEventListener('click', onCrossCardClose);
    buttonCardClose.addEventListener('keydown', onCrossCardClose);
    document.addEventListener('keydown', onEscCardClose);

    return newOfferCard;
  };

  window.card = {
    createOfferCards: createOfferCards
  };
})();
