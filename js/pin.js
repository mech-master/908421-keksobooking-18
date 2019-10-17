'use strict';

(function () {
  var VISIBLE_OFFER_COUNT = 5;
  /* var flatTypeSelect = document.querySelector('#housing-type');
  var currentFlatType = flatTypeSelect.options[flatTypeSelect.options.selectedIndex].value;/* */
  var pinContainer = document.querySelector('.map__pins');

  var onCardShow = function (elementPin, elementCard) {
    var mapFiltersContainer = document.querySelector('.map__filters-container');

    var onPinAction = function (evt) {
      if ((evt.type === 'click') || (evt.type === 'keydown' && evt.keyCode === window.common.Keycode.ENTER)) {
        window.card.deleteExistsCards();
        mapFiltersContainer.before(elementCard);
      }
    };

    elementPin.addEventListener('click', onPinAction);
    elementPin.addEventListener('keydown', onPinAction);
  };

  var createOfferPins = function (offerList) {
    var pinsFragment = document.createDocumentFragment();
    var pinTempate = document.querySelector('#pin').content.querySelector('.map__pin');
    var offerCount = offerList.length > VISIBLE_OFFER_COUNT ? VISIBLE_OFFER_COUNT : offerList.length;

    for (var l = 0; l < offerCount; l++) {
      var newOfferPin = pinTempate.cloneNode(true);
      newOfferPin.style.left = (offerList[l].location.x - window.common.PIN_WIDTH / 2) + 'px';
      newOfferPin.style.top = (offerList[l].location.y - window.common.PIN_HEIGHT) + 'px';
      var pinImage = newOfferPin.querySelector('img');
      pinImage.src = offerList[l].author.avatar;
      pinImage.alt = offerList[l].offer.title;

      var newOfferCard = window.card.createOfferCards(offerList[l]);

      onCardShow(newOfferPin, newOfferCard);

      pinsFragment.appendChild(newOfferPin);
    }

    return pinsFragment;
  };

  var deleteExistsPins = function () {
    var existsMapPins = pinContainer.querySelectorAll('.map__pin');
    window.card.deleteExistsCards();
    existsMapPins.forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });
  };

  var fillPinContainer = function (data) {
    deleteExistsPins();
    var mapPinsFragment = createOfferPins(data);
    pinContainer.appendChild(mapPinsFragment);
  };

  window.pin = {
    fillPinContainer: fillPinContainer,
    deleteExistsPins: deleteExistsPins
  };
})();
