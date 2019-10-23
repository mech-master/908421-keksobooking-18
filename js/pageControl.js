'use strict';

/* Блок управления состоянием страницы /* */

(function () {
  var mainMapPinStartCoordinate; // Резервирование переменной под объект стартовых координат mainMapPin /* */

  var offerFormElement = document.querySelector('.ad-form');
  var filterFormElement = document.querySelector('.map__filters');
  var mapContainerElement = document.querySelector('.map');
  var mainMapPinElement = mapContainerElement.querySelector('.map__pin--main');


  /* Перевод всех элементов управления из списка в активный/неактивный режим /* */

  var changeFormElementsStatus = function (masterForm, selectorList, status) {
    var elementList = masterForm.querySelectorAll(selectorList.join(','));
    for (var j = 0; j < elementList.length; j++) {
      elementList[j].disabled = status;
    }
  };

  /* Сброс страницы и форм в первоначальное состояние /* */

  var resetPage = function () {
    mainMapPinElement.style.left = mainMapPinStartCoordinate.x + 'px';
    mainMapPinElement.style.top = mainMapPinStartCoordinate.y + 'px';
    window.pin.deleteExistingPins();
    filterFormElement.reset();
    offerFormElement.reset();
    window.filter.isDataLoaded = false;
    window.avatar.resetPreview();
    window.offer.checkRoomsGuestsBalance();
  };

  /* Перевод страницы в активный/неактивный режим /* */

  var changePageStatus = function (isDisabled) {
    /* При первом проходе записать стартовые координаты mainMapPin /* */
    if (!mainMapPinStartCoordinate) {
      mainMapPinStartCoordinate = {
        x: mainMapPinElement.offsetLeft,
        y: mainMapPinElement.offsetTop
      };
    }

    if (mapContainerElement) {
      mapContainerElement.classList.toggle('map--faded', isDisabled);
    }
    if (offerFormElement) {
      offerFormElement.classList.toggle('ad-form--disabled', isDisabled);
    }
    var formElementSelectors = ['input', 'select', 'button', 'textarea'];

    changeFormElementsStatus(offerFormElement, formElementSelectors, isDisabled);
    changeFormElementsStatus(filterFormElement, formElementSelectors, isDisabled);
    if (isDisabled) {
      resetPage();
    }

    window.offer.onflatTypeChange();
    window.offer.refreshAddressValue();
  };

  changePageStatus(true);

  /* Обработчик события нажатия кнопки мыши на mainMapPin, движения мышью и отпускания кнопки /* */

  mainMapPinElement.addEventListener('mousedown', function (evtMouseDown) {
    evtMouseDown.preventDefault();
    if (mapContainerElement.classList.contains('map--faded')) {
      window.filter.loadOfferData();
    }

    if (window.filter.isDataLoaded) {
      var startMouseCoordinate = {
        x: evtMouseDown.clientX,
        y: evtMouseDown.clientY
      };

      var onMianPinMouseMove = function (evtMouseMove) {
        evtMouseMove.preventDefault();

        var shiftMouseCoordinate = {
          x: startMouseCoordinate.x - evtMouseMove.clientX,
          y: startMouseCoordinate.y - evtMouseMove.clientY
        };

        startMouseCoordinate = {
          x: evtMouseMove.clientX,
          y: evtMouseMove.clientY
        };

        var pointerCoordinate = window.offer.refreshAddressValue();

        if (((pointerCoordinate.x - shiftMouseCoordinate.x) >= 0) && ((pointerCoordinate.x - shiftMouseCoordinate.x) <= mapContainerElement.offsetWidth)) {
          mainMapPinElement.style.left = (mainMapPinElement.offsetLeft - shiftMouseCoordinate.x) + 'px';
        }

        if (((pointerCoordinate.y - shiftMouseCoordinate.y) >= window.common.MapContainerOffset.TOP) && ((pointerCoordinate.y - shiftMouseCoordinate.y) <= window.common.MapContainerOffset.BOTTOM)) {
          mainMapPinElement.style.top = (mainMapPinElement.offsetTop - shiftMouseCoordinate.y) + 'px';
        }
      };

      var onMainPinMouseUp = function (evtMouseUp) {
        evtMouseUp.preventDefault();

        document.removeEventListener('mousemove', onMianPinMouseMove);
        document.removeEventListener('mouseup', onMainPinMouseUp);
      };

      document.addEventListener('mousemove', onMianPinMouseMove);
      document.addEventListener('mouseup', onMainPinMouseUp);
    }
  });


  mainMapPinElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.common.Keycode.ENTER) {
      if (mapContainerElement.classList.contains('map--faded')) {
        window.filter.loadOfferData();
      }
    }
  });

  var buttonAdFormResetElement = offerFormElement.querySelector('.ad-form__reset');

  var onAdFormSubmit = function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(offerFormElement), window.common.onMessageSuccessShow, window.common.onErrorMessageShow);
  };

  var onAdFormReset = function (evt) {
    evt.preventDefault();
    changePageStatus(true);
    window.offer.refreshAddressValue();
  };

  var onEnterResetPressed = function (evt) {
    if (evt.keyCode === window.common.Keycode.ENTER) {
      onAdFormReset(evt);
    }
  };

  offerFormElement.addEventListener('submit', onAdFormSubmit);

  buttonAdFormResetElement.addEventListener('click', onAdFormReset);
  buttonAdFormResetElement.addEventListener('keydown', onEnterResetPressed);

  window.pageControl = {
    changePageStatus: changePageStatus
  };
})();
