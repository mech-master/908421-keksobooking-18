'use strict';

(function () {
  var onCardShow = function (elementPin, elementCard) {
    var mapFiltersContainer = document.querySelector('.map__filters-container');

    var onPinAction = function (evt) {
      var ENTER_KEYCODE = 13;
      if ((evt.type === 'click') || (evt.type === 'keydown' && evt.keyCode === ENTER_KEYCODE)) {
        var openedCardList = document.querySelectorAll('.map__card.popup');
        for (var k = 0; k < openedCardList.length; k++) {
          openedCardList[k].remove();
        }
        mapFiltersContainer.before(elementCard);
      }
    };

    elementPin.addEventListener('click', onPinAction);
    elementPin.addEventListener('keydown', onPinAction);
  };

  var createOfferPins = function (offerList) {
    var pinsFragment = document.createDocumentFragment();
    var pinTempate = document.querySelector('#pin').content.querySelector('.map__pin');
    for (var l = 0; l < offerList.length; l++) {
      var newOfferPin = pinTempate.cloneNode(true);
      newOfferPin.style.left = (offerList[l].location.x - window.data.PIN_WIDTH / 2) + 'px';
      newOfferPin.style.top = (offerList[l].location.y - window.data.PIN_HEIGHT) + 'px';
      var pinImage = newOfferPin.querySelector('img');
      pinImage.src = offerList[l].author.avatar;
      pinImage.alt = offerList[l].offer.title;

      var newOfferCard = window.card.createOfferCards(offerList[l]);

      onCardShow(newOfferPin, newOfferCard);

      pinsFragment.appendChild(newOfferPin);
    }
    return pinsFragment;
  };

  window.pin = {
    createOfferPins: createOfferPins
  };
})();
