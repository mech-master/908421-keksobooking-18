'use strict';

(function () {
  var refreshAddressValue = function () {
    var mapContainer = document.querySelector('.map');
    var mainMapPin = mapContainer.querySelector('.map__pin--main');
    var mainMapPinParameters = {
      left: mainMapPin.offsetLeft,
      top: mainMapPin.offsetTop,
      width: mainMapPin.offsetWidth,
      height: mainMapPin.offsetHeight
    };

    var POINTER_HEIGHT = 17;

    var formAdressInput = document.querySelector('#address');

    var mainMapPinCoordinates = {
      x: Math.round(mainMapPinParameters.left + mainMapPinParameters.width / 2),
      y: Math.round(mainMapPinParameters.top + mainMapPinParameters.height + POINTER_HEIGHT)
    };

    if (mapContainer.classList.contains('map--faded')) {
      mainMapPinCoordinates.y = Math.round(mainMapPinParameters.top + mainMapPinParameters.height / 2);
    }

    formAdressInput.value = mainMapPinCoordinates.x + ', ' + mainMapPinCoordinates.y;
    return mainMapPinCoordinates;
  };

  /* Обработчик нажатия на label загрузки изображений /* */
  var adFormDropZones = ['.ad-form-header__drop-zone', 'ad-form__drop-zone'];
  adFormDropZones.forEach(function (className) {
    if (document.querySelector(className)) {
      var element = document.querySelector(className);
      element.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.common.Keycode.ENTER) {
          document.querySelector('#' + element.htmlFor).click();
        }
      });
    }
  });

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

  window.offer = {
    refreshAddressValue: refreshAddressValue,
    checkRoomsGuestsBalance: checkRoomsGuestsBalance,
    setMininmalPrice: setMininmalPrice
  };
})();
