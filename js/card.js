'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var declinationCount = function (number, single, multiple) {
    return (number === 1) ? number + ' ' + single : number + ' ' + multiple;
  };

  var deleteNonExistentItem = function (sourceElement, sourseArray) {
    var m = 0;
    while (sourceElement.children.length > sourseArray.length) {
      var classSubstring = sourceElement.children[m].classList[1].substring(16);
      if (sourseArray.indexOf(classSubstring) === -1) {
        sourceElement.children[m].remove();
      } else {
        m++;
      }
    }
  };

  var fillPopupPhotoContainer = function (newOfferCardClone, sourceArray) {
    var popupPhotoContainerElement = newOfferCardClone.querySelector('.popup__photos');
    var popupPhotoTemplate = popupPhotoContainerElement.querySelector('.popup__photo');
    if (!sourceArray.length) {
      popupPhotoTemplate.remove();
    } else {
      for (var n = 0; n < sourceArray.length; n++) {
        if (n) {
          var newPhoto = popupPhotoTemplate.cloneNode(true);
          newPhoto.src = sourceArray[n];
          popupPhotoContainerElement.appendChild(newPhoto);
        } else {
          popupPhotoTemplate.src = sourceArray[n];
        }
      }
    }
  };

  var createOfferCards = function (offerItem) {
    var newCardElement = cardTemplate.cloneNode(true);
    var featuresContainerElement = newCardElement.querySelector('.popup__features');
    var buttonCardClose = newCardElement.querySelector('.popup__close');

    var onCrossClickCardClose = function () {
      newCardElement.remove();
    };

    var onCrossEnterCardClose = function (evt) {
      if (evt.keyCode === window.common.Keycode.ENTER) {
        newCardElement.remove();
      }
    };

    var onEscCardClose = function (evt) {
      if (evt.keyCode === window.common.Keycode.ESC) {
        newCardElement.remove();
      }
    };

    newCardElement.querySelector('.popup__title').textContent = offerItem.offer.title;
    newCardElement.querySelector('.popup__text--address').textContent = offerItem.offer.address;
    newCardElement.querySelector('.popup__text--price').innerHTML = offerItem.offer.price + '&#8381;/ночь';
    newCardElement.querySelector('.popup__type').textContent = window.common.apartmentTypesEngToRus[offerItem.offer.type];
    newCardElement.querySelector('.popup__text--capacity').textContent = declinationCount(offerItem.offer.rooms, 'комната', 'комнаты') + ' для ' + declinationCount(offerItem.offer.guests, 'гостя', 'гостей');
    newCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;
    deleteNonExistentItem(featuresContainerElement, offerItem.offer.features);
    newCardElement.querySelector('.popup__description').textContent = offerItem.offer.description;
    fillPopupPhotoContainer(newCardElement, offerItem.offer.photos);
    newCardElement.querySelector('.popup__avatar').src = offerItem.author.avatar;

    buttonCardClose.addEventListener('click', onCrossClickCardClose);
    buttonCardClose.addEventListener('keydown', onCrossEnterCardClose);
    document.addEventListener('keydown', onEscCardClose);

    return newCardElement;
  };

  var deleteExistingCards = function () {
    var cardElements = document.querySelectorAll('.map__card.popup');
    cardElements.forEach(function (item) {
      item.remove();
    });
  };

  window.card = {
    createOfferCards: createOfferCards,
    deleteExistingCards: deleteExistingCards
  };
})();
