'use strict';

(function () {
  var ROOM_NUMBER_HUNDRED_INDEX = 3;
  var GUEST_CAPACITY_NONE_INDEX = 3;
  var GUEST_CAPACITY_ONE_INDEX = 2;
  var POINTER_HEIGHT = 17;

  var refreshAddressValue = function () {
    var mapContainerElement = document.querySelector('.map');
    var mainMapPinElement = mapContainerElement.querySelector('.map__pin--main');
    var mainMapPinParameter = {
      left: mainMapPinElement.offsetLeft,
      top: mainMapPinElement.offsetTop,
      width: mainMapPinElement.offsetWidth,
      height: mainMapPinElement.offsetHeight
    };
    var formAddressInput = document.querySelector('#address');

    var mainMapPinCoordinate = {
      x: Math.round(mainMapPinParameter.left + mainMapPinParameter.width / 2),
      y: Math.round(mainMapPinParameter.top + mainMapPinParameter.height + POINTER_HEIGHT)
    };

    if (mapContainerElement.classList.contains('map--faded')) {
      mainMapPinCoordinate.y = Math.round(mainMapPinParameter.top + mainMapPinParameter.height / 2);
    }

    formAddressInput.value = mainMapPinCoordinate.x + ', ' + mainMapPinCoordinate.y;
    return mainMapPinCoordinate;
  };

  /* Обработчик нажатия на label загрузки изображений /* */
  var adFormDropZoneElements = ['.ad-form-header__drop-zone', 'ad-form__drop-zone'];
  adFormDropZoneElements.forEach(function (className) {
    if (document.querySelector(className)) {
      var element = document.querySelector(className);
      element.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.common.Keycode.ENTER) {
          document.querySelector('#' + element.htmlFor).click();
        }
      });
    }
  });

  var roomNumberElement = document.querySelector('#room_number');
  var guestCapacityElement = document.querySelector('#capacity');

  if (roomNumberElement.options.selectedIndex < ROOM_NUMBER_HUNDRED_INDEX) {
    guestCapacityElement.options.selectedIndex = GUEST_CAPACITY_ONE_INDEX - roomNumberElement.options.selectedIndex;
  } else {
    guestCapacityElement.options.selectedIndex = GUEST_CAPACITY_NONE_INDEX;
  }

  var checkRoomsGuestsBalance = function () {
    var abilityOptionIndexList = [];
    if (roomNumberElement.options.selectedIndex < ROOM_NUMBER_HUNDRED_INDEX) {
      for (var i = GUEST_CAPACITY_ONE_INDEX; i >= GUEST_CAPACITY_ONE_INDEX - roomNumberElement.options.selectedIndex; i--) {
        abilityOptionIndexList.push(i);
      }
    } else {
      abilityOptionIndexList = [GUEST_CAPACITY_NONE_INDEX];
    }

    if (abilityOptionIndexList.indexOf(guestCapacityElement.options.selectedIndex) === -1) {
      var message = 'При выбранном количестве комнат: ' +
      roomNumberElement.options[roomNumberElement.options.selectedIndex].text +
      '; могут быть выбраны только следующие параметры: ';
      for (var j = 0; j < abilityOptionIndexList.length; j++) {
        if (j) {
          message += guestCapacityElement.options[abilityOptionIndexList[j]].text;
        } else {
          message += ', ' + guestCapacityElement.options[abilityOptionIndexList[j]].text;
        }
      }
      guestCapacityElement.setCustomValidity(message);
    } else {
      guestCapacityElement.setCustomValidity('');
    }
  };

  guestCapacityElement.addEventListener('change', checkRoomsGuestsBalance);
  roomNumberElement.addEventListener('change', checkRoomsGuestsBalance);

  var flatMinimumPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var flatTypeElement = document.querySelector('#type');
  var flatPriceElement = document.querySelector('#price');

  var onflatTypeChange = function () {
    var currentFlatType = flatTypeElement.options[flatTypeElement.options.selectedIndex].value;
    flatPriceElement.setAttribute('min', flatMinimumPrice[currentFlatType]);
    flatPriceElement.setAttribute('placeholder', flatMinimumPrice[currentFlatType]);
  };

  flatTypeElement.addEventListener('change', onflatTypeChange);

  var checkInElement = document.querySelector('#timein');
  var checkOutElement = document.querySelector('#timeout');
  var agreeCheckinCheckout = function (evt) {
    if (evt.target === checkInElement) {
      checkOutElement.options.selectedIndex = checkInElement.options.selectedIndex;
    } else {
      checkInElement.options.selectedIndex = checkOutElement.options.selectedIndex;
    }
  };

  var onCheckInChange = function (evt) {
    agreeCheckinCheckout(evt);
  };

  var onCheckOutChange = function (evt) {
    agreeCheckinCheckout(evt);
  };

  checkInElement.addEventListener('change', onCheckInChange);
  checkOutElement.addEventListener('change', onCheckOutChange);

  window.offer = {
    refreshAddressValue: refreshAddressValue,
    checkRoomsGuestsBalance: checkRoomsGuestsBalance,
    onflatTypeChange: onflatTypeChange
  };
})();
