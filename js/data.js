'use strict';

(function () {
  var OFFER_COUNT = 8;
  var Keycode = {
    ESC: 27,
    ENTER: 13
  };

  var APARTMENT_TYPE_VARIANTS = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var APARTMENT_TYPE_VARIANTS_RUS = [
    'Дворец',
    'Квартира',
    'Дом',
    'Бунгало'
  ];

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  window.data = {
    Keycode: Keycode,
    OFFER_COUNT: OFFER_COUNT,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    APARTMENT_TYPE_VARIANTS: APARTMENT_TYPE_VARIANTS,
    APARTMENT_TYPE_VARIANTS_RUS: APARTMENT_TYPE_VARIANTS_RUS
  };
})();

