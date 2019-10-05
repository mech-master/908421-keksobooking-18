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
    for (var n = 0; n < sourceArray.length; n++) {
      if (n) {
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
    var offerList = window.data.offerList;

    for (var k = 0; k < offerCount; k++) {
      var newOfferCard = cardTemplate.cloneNode(true);
      var apartmentTypeRus = window.data.APARTMENT_TYPE_VARIANTS_RUS[window.data.APARTMENT_TYPE_VARIANTS.indexOf(offerList[k].offer.type)];
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

  window.card = {
    createOfferCards: createOfferCards
  };
})();
