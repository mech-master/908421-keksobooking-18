'use strict';

(function () {
  var OFFER_COUNT = 8;
  var Keycode = {
    ESC: 27,
    ENTER: 13
  };

  var apartmentTypesEngToRus = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };


  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MapContainerOffset = {
    TOP: 130,
    BOTTOM: 600
  };

  window.data = {
    Keycode: Keycode,
    OFFER_COUNT: OFFER_COUNT,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    apartmentTypesEngToRus: apartmentTypesEngToRus,
    MapContainerOffset: MapContainerOffset
  };
})();

