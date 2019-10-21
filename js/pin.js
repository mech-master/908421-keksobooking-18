'use strict';

(function () {
  var VISIBLE_OFFER_COUNT = 5;

  var pinContainerElement = document.querySelector('.map__pins');
  var filtersContainerElement = document.querySelector('.map__filters-container');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var onCardShow = function (pinElement, cardElement) {
    var showCard = function (target) {
      window.card.deleteExistingCards();
      var pinActiveElement = document.querySelector('.map__pin--active');
      if (pinActiveElement) {
        pinActiveElement.classList.remove('map__pin--active');
      }
      target.classList.add('map__pin--active');
      filtersContainerElement.before(cardElement);
    };

    var onPinClick = function (evt) {
      showCard(evt.target);
    };

    var onEnterPinPressed = function (evt) {
      if (evt.keyCode === window.common.Keycode.ENTER) {
        showCard(evt.target);
      }
    };

    pinElement.addEventListener('click', onPinClick);
    pinElement.addEventListener('keydown', onEnterPinPressed);
  };

  var createOfferPins = function (offerList) {
    var pinsFragment = document.createDocumentFragment();
    var offerCount = offerList.length > VISIBLE_OFFER_COUNT ? VISIBLE_OFFER_COUNT : offerList.length;

    for (var l = 0; l < offerCount; l++) {
      if (offerList[l].offer) {
        var newPinElement = pinTemplate.cloneNode(true);
        newPinElement.style.left = (offerList[l].location.x - window.common.PIN_WIDTH / 2) + 'px';
        newPinElement.style.top = (offerList[l].location.y - window.common.PIN_HEIGHT) + 'px';
        var pinImageElement = newPinElement.querySelector('img');
        pinImageElement.src = offerList[l].author.avatar;
        pinImageElement.alt = offerList[l].offer.title;

        var newOfferCard = window.card.createOfferCards(offerList[l]);

        onCardShow(newPinElement, newOfferCard);

        pinsFragment.appendChild(newPinElement);
      }
    }

    return pinsFragment;
  };

  var deleteExistingPins = function () {
    var MapPinElements = pinContainerElement.querySelectorAll('.map__pin');
    window.card.deleteExistingCards();
    MapPinElements.forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });
  };

  var fillPinContainer = function (data) {
    deleteExistingPins();
    pinContainerElement.appendChild(createOfferPins(data));
  };

  window.pin = {
    fillPinContainer: fillPinContainer,
    deleteExistingPins: deleteExistingPins
  };
})();
