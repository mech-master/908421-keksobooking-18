'use strict';

/* Блок управления состоянием страницы /* */

(function () {
  var mainMapPinStartCoordinate; // Резервирование переменной под объект стартовых координат mainMapPin /* */

  var newOfferForm = document.querySelector('.ad-form');
  var mapFiltersForm = document.querySelector('.map__filters');
  var mapContainer = document.querySelector('.map');
  var mainMapPin = mapContainer.querySelector('.map__pin--main');


  /* Перевод всех элементов управления из списка в активный/неактивный режим /* */


  var formElementDisableStatusChange = function (masterForm, selectorList, status) {
    for (var i = 0; i < selectorList.length; i++) {
      var elementList = masterForm.querySelectorAll(selectorList[i]);
      for (var j = 0; j < elementList.length; j++) {
        elementList[j].disabled = status;
      }
    }
  };

  /* Сброс страницы и форм в первоначальное состояние /* */

  var resetPage = function () {
    mainMapPin.style.left = mainMapPinStartCoordinate.x + 'px';
    mainMapPin.style.top = mainMapPinStartCoordinate.y + 'px';
    window.pin.deleteExistsPins();
    mapFiltersForm.reset();
    newOfferForm.reset();
    window.avatar.onImageReset();
    window.offer.checkRoomsGuestsBalance();
  };

  /* Перевод страницы в активный/неактивный режим /* */

  var pageDisableStatusChange = function (isDisabled) {
    /* При первом проходе записать стартовые координаты mainMapPin /* */
    if (!mainMapPinStartCoordinate) {
      mainMapPinStartCoordinate = {
        x: mainMapPin.offsetLeft,
        y: mainMapPin.offsetTop
      };
    }


    if (mapContainer) {
      mapContainer.classList.toggle('map--faded', isDisabled);
    }
    if (newOfferForm) {
      newOfferForm.classList.toggle('ad-form--disabled', isDisabled);
    }
    var formElementsSelectors = ['input', 'select', 'button', 'textarea'];

    formElementDisableStatusChange(newOfferForm, formElementsSelectors, isDisabled);
    formElementDisableStatusChange(mapFiltersForm, formElementsSelectors, isDisabled);
    if (isDisabled) {
      resetPage();
    }

    window.offer.setMininmalPrice();
    window.offer.refreshAddressValue();
  };

  pageDisableStatusChange(true);

  /* Обработчик события нажатия кнопки мыши на mainMapPin, движения мышью и отпускания кнопки /* */

  mainMapPin.addEventListener('mousedown', function (evtMouseDown) {
    evtMouseDown.preventDefault();
    if (mapContainer.classList.contains('map--faded')) {
      window.filter.loadOfferData();
    }

    if (window.filter.isDataLoaded) {
      var startMouseCoordinates = {
        x: evtMouseDown.clientX,
        y: evtMouseDown.clientY
      };

      var onMianPinMouseMove = function (evtMouseMove) {
        evtMouseMove.preventDefault();

        var shiftMouseCoordinates = {
          x: startMouseCoordinates.x - evtMouseMove.clientX,
          y: startMouseCoordinates.y - evtMouseMove.clientY
        };

        startMouseCoordinates = {
          x: evtMouseMove.clientX,
          y: evtMouseMove.clientY
        };

        var pointerCoordinates = window.offer.refreshAddressValue();

        if (((pointerCoordinates.x - shiftMouseCoordinates.x) >= 0) && ((pointerCoordinates.x - shiftMouseCoordinates.x) <= mapContainer.offsetWidth)) {
          mainMapPin.style.left = (mainMapPin.offsetLeft - shiftMouseCoordinates.x) + 'px';
        }

        if (((pointerCoordinates.y - shiftMouseCoordinates.y) >= window.common.MapContainerOffset.TOP) && ((pointerCoordinates.y - shiftMouseCoordinates.y) <= window.common.MapContainerOffset.BOTTOM)) {
          mainMapPin.style.top = (mainMapPin.offsetTop - shiftMouseCoordinates.y) + 'px';
        }
      };

      var onMianPinMouseUp = function (evtMouseUp) {
        evtMouseUp.preventDefault();

        document.removeEventListener('mousemove', onMianPinMouseMove);
        document.removeEventListener('mouseup', onMianPinMouseUp);
      };

      document.addEventListener('mousemove', onMianPinMouseMove);
      document.addEventListener('mouseup', onMianPinMouseUp);
    }
  });


  mainMapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.common.Keycode.ENTER) {
      if (mapContainer.classList.contains('map--faded')) {
        window.filter.loadOfferData();
      }
    }
  });

  var formAd = document.querySelector('.ad-form');
  var buttonAdFormReset = formAd.querySelector('.ad-form__reset');

  var onAdFormSubmit = function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(formAd), window.common.onSuccessMessageShow, window.common.onErrorMessageShow);
  };

  var onAdFormReset = function (evt) {
    if (((evt.type === 'click') || (evt.type === 'keydown' && evt.keyCode === window.common.Keycode.ENTER))) {
      evt.preventDefault();
      pageDisableStatusChange(true);
      window.offer.refreshAddressValue();
    }
  };

  formAd.addEventListener('submit', onAdFormSubmit);

  buttonAdFormReset.addEventListener('click', onAdFormReset);
  buttonAdFormReset.addEventListener('keydown', onAdFormReset);

  window.pageControl = {
    pageDisableStatusChange: pageDisableStatusChange
  };
})();
