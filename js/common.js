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

  var onErrorMessageShow = function (message) {
    var templateErrorMessage = document.querySelector('#error').content.querySelector('.error');
    var sectionMain = document.querySelector('main');
    var messageError = templateErrorMessage.cloneNode(true);
    var paragraphErrorMessage = messageError.querySelector('.error__message');
    var buttonErrorMessageClose = messageError.querySelector('.error__button');
    var onErrorMessageClose = function (evt) {
      if (((evt.type === 'click') ||
        (evt.type === 'keydown' && evt.keyCode === window.common.Keycode.ESC)) ||
        (evt.type === 'keydown' && evt.keyCode === window.common.Keycode.ENTER && evt.target === buttonErrorMessageClose)) {
        messageError.remove();
        document.removeEventListener('keydown', onErrorMessageClose);
      }
    };
    messageError.addEventListener('click', onErrorMessageClose);
    document.addEventListener('keydown', onErrorMessageClose);
    buttonErrorMessageClose.addEventListener('click', onErrorMessageClose);
    buttonErrorMessageClose.addEventListener('keydown', onErrorMessageClose);
    paragraphErrorMessage.textContent = message;
    sectionMain.appendChild(messageError);
    buttonErrorMessageClose.focus();
    window.pageControl.isDataLoaded = false;
  };

  var onSuccessMessageShow = function () {
    var templateSuccessMessage = document.querySelector('#success').content.querySelector('.success');
    var sectionMain = document.querySelector('main');
    var messageSuccess = templateSuccessMessage.cloneNode(true);
    var onMessageSuccessClose = function (evt) {
      if ((evt.type === 'click') || (evt.type === 'keydown' && evt.keyCode === window.common.Keycode.ESC)) {
        messageSuccess.remove();
        document.removeEventListener('keydown', onMessageSuccessClose);
      }
    };
    messageSuccess.addEventListener('click', onMessageSuccessClose);
    document.addEventListener('keydown', onMessageSuccessClose);
    sectionMain.appendChild(messageSuccess);
    window.pageControl.pageDisableStatusChange(true);
  };

  window.common = {
    Keycode: Keycode,
    OFFER_COUNT: OFFER_COUNT,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    apartmentTypesEngToRus: apartmentTypesEngToRus,
    MapContainerOffset: MapContainerOffset,
    onErrorMessageShow: onErrorMessageShow,
    onSuccessMessageShow: onSuccessMessageShow
  };
})();

