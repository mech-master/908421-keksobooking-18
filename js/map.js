'use strict';

(function () {
  var mapContainer = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  if (!mapContainer.classList.contains('map--faded')) {
    mapFiltersContainer.before(window.card.createOfferCards(window.data.OFFER_COUNT));
  }
})();
