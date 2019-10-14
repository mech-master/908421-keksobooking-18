'use strict';

(function () {
  var loadOfferDataSuccess = function (data) {
    if (data) {
      window.pageControl.offerList = data;
      window.pin.fillPinContainer(data);
    }
  };

  var loadError = function (message) {
    var elemetErrorTemplate = document.querySelector('#error').content.querySelector('.error');
    var newSectionError = elemetErrorTemplate.cloneNode(true);
    var elementErrorMessage = newSectionError.querySelector('.error__message');
    var pageMianSection = document.querySelector('main');
    elementErrorMessage.textContent = message;

    pageMianSection.appendChild(newSectionError);
  };

  var loadOfferData = function () {
    try {
      window.backend.load(loadOfferDataSuccess, loadError);
    } catch (err) {
      throw new Error('Ошибка ' + err.name + ' : ' + err.message + '\n' + err.stack);
    }
  };

  window.pageControl = {
    loadOfferData: loadOfferData,
    offerList: []
  };
})();

(function () {
  var formElementDisableStatusChange = function (masterForm, selectorList, status) {
    for (var i = 0; i < selectorList.length; i++) {
      var elementList = masterForm.querySelectorAll(selectorList[i]);
      for (var j = 0; j < elementList.length; j++) {
        elementList[j].disabled = status;
      }
    }
  };

  var mapContainer = document.querySelector('.map');

  var mainMapPin = document.querySelector('.map__pin--main');

  var refreshAddressValue = function (element) {
    var elementParameters = {
      left: element.offsetLeft,
      top: element.offsetTop,
      width: element.offsetWidth,
      height: element.offsetHeight
    };

    var POINTER_HEIGHT = 17;

    var formAdressInput = document.querySelector('#address');

    var elementCoordinates = {
      x: Math.round(elementParameters.left + elementParameters.width / 2),
      y: Math.round(elementParameters.top + elementParameters.height + POINTER_HEIGHT)
    };

    if (mapContainer.classList.contains('map--faded')) {
      elementCoordinates = Math.round(elementParameters.top + elementParameters.height / 2);
    }

    formAdressInput.value = elementCoordinates.x + ', ' + elementCoordinates.y;
    return elementCoordinates;
  };

  var pageDisableStatusChange = function (isDisabled) {
    var newOfferForm = document.querySelector('.ad-form');
    if (mapContainer) {
      mapContainer.classList.toggle('map--faded', isDisabled);
    }
    if (newOfferForm) {
      newOfferForm.classList.toggle('ad-form--disabled', isDisabled);
    }
    var formElementsSelectors = ['input', 'select', 'button', 'textarea'];
    var mapFiltersForm = document.querySelector('.map__filters');
    if (!isDisabled) {
      window.pageControl.loadOfferData();
    }

    formElementDisableStatusChange(newOfferForm, formElementsSelectors, isDisabled);
    formElementDisableStatusChange(mapFiltersForm, formElementsSelectors, isDisabled);
    refreshAddressValue(mainMapPin);
  };

  pageDisableStatusChange(true);

  mainMapPin.addEventListener('mousedown', function (evtMouseDown) {
    evtMouseDown.preventDefault();
    pageDisableStatusChange(false);

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

      var pointerCoordinates = refreshAddressValue(mainMapPin);

      if (((pointerCoordinates.x - shiftMouseCoordinates.x) >= 0) && ((pointerCoordinates.x - shiftMouseCoordinates.x) <= mapContainer.offsetWidth)) {
        mainMapPin.style.left = (mainMapPin.offsetLeft - shiftMouseCoordinates.x) + 'px';
      }

      if (((pointerCoordinates.y - shiftMouseCoordinates.y) >= window.data.MapContainerOffset.TOP) && ((pointerCoordinates.y - shiftMouseCoordinates.y) <= window.data.MapContainerOffset.BOTTOM)) {
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

  });

  mainMapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.Keycode.ENTER) {
      pageDisableStatusChange(false);
    }
  });
})();

(function () {
  var formRoomNumberSelect = document.querySelector('#room_number');
  var formGuestCapacitySelect = document.querySelector('#capacity');
  var ROOM_NUMBER_HUNDRED_INDEX = 3;
  var GUEST_CAPACITY_NONE_INDEX = 3;
  var GUEST_CAPACITY_ONE_INDEX = 2;

  if (formRoomNumberSelect.options.selectedIndex < ROOM_NUMBER_HUNDRED_INDEX) {
    formGuestCapacitySelect.options.selectedIndex = GUEST_CAPACITY_ONE_INDEX - formRoomNumberSelect.options.selectedIndex;
  } else {
    formGuestCapacitySelect.options.selectedIndex = GUEST_CAPACITY_NONE_INDEX;
  }

  var checkRoomsGuestsBalance = function () {
    var abilityOptionIndexList = [];
    if (formRoomNumberSelect.options.selectedIndex < ROOM_NUMBER_HUNDRED_INDEX) {
      for (var i = GUEST_CAPACITY_ONE_INDEX; i >= GUEST_CAPACITY_ONE_INDEX - formRoomNumberSelect.options.selectedIndex; i--) {
        abilityOptionIndexList.push(i);
      }
    } else {
      abilityOptionIndexList = [GUEST_CAPACITY_NONE_INDEX];
    }

    if (abilityOptionIndexList.indexOf(formGuestCapacitySelect.options.selectedIndex) === -1) {
      var message = 'При выбранном количестве комнат: ' +
      formRoomNumberSelect.options[formRoomNumberSelect.options.selectedIndex].text +
      '; могут быть выбраны только следующие параметры: ';
      for (var j = 0; j < abilityOptionIndexList.length; j++) {
        if (j) {
          message += formGuestCapacitySelect.options[abilityOptionIndexList[j]].text;
        } else {
          message += ', ' + formGuestCapacitySelect.options[abilityOptionIndexList[j]].text;
        }
      }
      formGuestCapacitySelect.setCustomValidity(message);
    } else {
      formGuestCapacitySelect.setCustomValidity('');
    }
  };

  formGuestCapacitySelect.addEventListener('change', checkRoomsGuestsBalance);
  formRoomNumberSelect.addEventListener('change', checkRoomsGuestsBalance);
})();

(function () {
  var flatMinimumPrices = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var flatTypeSelect = document.querySelector('#type');
  var flatPriceInput = document.querySelector('#price');

  var setMininmalPrice = function () {
    var currentFlatType = flatTypeSelect.options[flatTypeSelect.options.selectedIndex].value;
    flatPriceInput.setAttribute('min', flatMinimumPrices[currentFlatType]);
    flatPriceInput.setAttribute('placeholder', flatMinimumPrices[currentFlatType]);
  };

  flatTypeSelect.addEventListener('change', setMininmalPrice);

  setMininmalPrice();
})();

(function () {
  var elementCheckinSelect = document.querySelector('#timein');
  var elementCheckoutSelect = document.querySelector('#timeout');
  var agreeCheckinCheckout = function (evt) {
    if (evt.target === elementCheckinSelect) {
      elementCheckoutSelect.options.selectedIndex = elementCheckinSelect.options.selectedIndex;
    } else {
      elementCheckinSelect.options.selectedIndex = elementCheckoutSelect.options.selectedIndex;
    }
  };
  elementCheckinSelect.addEventListener('change', agreeCheckinCheckout);
  elementCheckoutSelect.addEventListener('change', agreeCheckinCheckout);
})();

(function () {
  var flatTypeSelect = document.querySelector('#housing-type');
  flatTypeSelect.addEventListener('change', function () {
    var mapCardList = document.querySelectorAll('.map__card');
    mapCardList.forEach(function (item) {
      item.remove();
    });

    window.pin.fillPinContainer(window.pageControl.offerList);
  });
})();
