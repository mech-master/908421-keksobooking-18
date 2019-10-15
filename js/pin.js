'use strict';

(function () {
  var VISIBLE_OFFER_COUNT = 5;
  var flatTypeSelect = document.querySelector('#housing-type');
  var currentFlatType = flatTypeSelect.options[flatTypeSelect.options.selectedIndex].value;
  var pinContainer = document.querySelector('.map__pins');

  var onCardShow = function (elementPin, elementCard) {
    var mapFiltersContainer = document.querySelector('.map__filters-container');

    var onPinAction = function (evt) {
      if ((evt.type === 'click') || (evt.type === 'keydown' && evt.keyCode === window.data.Keycode.ENTER)) {
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
    currentFlatType = flatTypeSelect.options[flatTypeSelect.options.selectedIndex].value;
    if (currentFlatType !== 'any') {
      var filteredOfferList = offerList.filter(function (item) {
        return item.offer.type === currentFlatType;
      });
    } else {
      filteredOfferList = offerList;
    }

    var offerCount = filteredOfferList.length > VISIBLE_OFFER_COUNT ? VISIBLE_OFFER_COUNT : filteredOfferList.length;

    for (var l = 0; l < offerCount; l++) {
      var newOfferPin = pinTempate.cloneNode(true);
      newOfferPin.style.left = (filteredOfferList[l].location.x - window.data.PIN_WIDTH / 2) + 'px';
      newOfferPin.style.top = (filteredOfferList[l].location.y - window.data.PIN_HEIGHT) + 'px';
      var pinImage = newOfferPin.querySelector('img');
      pinImage.src = filteredOfferList[l].author.avatar;
      pinImage.alt = filteredOfferList[l].offer.title;

      var newOfferCard = window.card.createOfferCards(filteredOfferList[l]);

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
