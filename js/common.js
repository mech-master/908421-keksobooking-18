'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MapContainerOffset = {
    TOP: 130,
    BOTTOM: 600
  };
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

  var sectionMainElement = document.querySelector('main');

  var onErrorMessageShow = function (message) {
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessageElement = errorMessageTemplate.cloneNode(true);
    var messageParagraphElement = errorMessageElement.querySelector('.error__message');
    var buttonMessageCloseElement = errorMessageElement.querySelector('.error__button');

    var onErrorMessageClose = function () {
      errorMessageElement.remove();
      document.removeEventListener('keydown', onEscErrorMessageClose);
    };
    var onEscErrorMessageClose = function (evt) {
      if (evt.keyCode === window.common.Keycode.ESC) {
        onErrorMessageClose();
      }
    };
    var onEnterMessageClose = function (evt) {
      if (evt.keyCode === window.common.Keycode.ENTER) {
        onErrorMessageClose();
      }
    };
    errorMessageElement.addEventListener('click', onErrorMessageClose);
    document.addEventListener('keydown', onEscErrorMessageClose);
    buttonMessageCloseElement.addEventListener('keydown', onEnterMessageClose);
    messageParagraphElement.textContent = message;
    sectionMainElement.appendChild(errorMessageElement);
    buttonMessageCloseElement.focus();
    window.pageControl.isDataLoaded = false;
  };

  var onMessageSuccessShow = function () {
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessageElement = successMessageTemplate.cloneNode(true);
    var onMessageSuccessClose = function () {
      successMessageElement.remove();
      document.removeEventListener('keydown', onEscMessageClose);
    };

    var onEscMessageClose = function (evt) {
      if (evt.keyCode === window.common.Keycode.ESC) {
        onMessageSuccessClose();
      }
    };

    successMessageElement.addEventListener('click', onMessageSuccessClose);
    document.addEventListener('keydown', onEscMessageClose);
    sectionMainElement.appendChild(successMessageElement);
    window.pageControl.changePageStatus(true);
  };

  window.common = {
    Keycode: Keycode,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    apartmentTypesEngToRus: apartmentTypesEngToRus,
    MapContainerOffset: MapContainerOffset,
    onErrorMessageShow: onErrorMessageShow,
    onMessageSuccessShow: onMessageSuccessShow
  };
})();

