'use strict';

(function () {
  var createOfferPins = function (offerList) {
    var documentFragment = document.createDocumentFragment();
    var pinTempate = document.querySelector('#pin').content.querySelector('.map__pin');
    for (var l = 0; l < offerList.length; l++) {
      var newOffer = pinTempate.cloneNode(true);
      newOffer.style.left = (offerList[l].location.x - window.data.PIN_WIDTH / 2) + 'px';
      newOffer.style.top = (offerList[l].location.y - window.data.PIN_HEIGHT) + 'px';
      var pinImage = newOffer.querySelector('img');
      pinImage.src = offerList[l].author.avatar;
      pinImage.alt = offerList[l].offer.title;
      documentFragment.appendChild(newOffer);
    }
    return documentFragment;
  };

  window.pin = {
    createOfferPins: createOfferPins
  };
})();
