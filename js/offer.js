'use strict';

(function () {
  var ROOM_NUMBER_HUNDRED_INDEX = 3;
  var GUEST_CAPACITY_NONE_INDEX = 3;
  var GUEST_CAPACITY_ONE_INDEX = 2;
  var POINTER_HEIGHT = 17;
  var IMAGE_DROP_ZONE_SELECTORS = ['.ad-form-header__drop-zone', 'ad-form__drop-zone'];

  var refreshAddressValue = function () {
    var mapContainerElement = document.querySelector('.map');
    var mainMapPinElement = mapContainerElement.querySelector('.map__pin--main');
    var mainMapPinParameter = {
      left: mainMapPinElement.offsetLeft,
      top: mainMapPinElement.offsetTop,
      width: mainMapPinElement.offsetWidth,
      height: mainMapPinElement.offsetHeight
    };
    var addressInputElement = document.querySelector('#address');

    var mainMapPinCoordinate = {
      x: Math.round(mainMapPinParameter.left + mainMapPinParameter.width / 2),
      y: Math.round(mainMapPinParameter.top + mainMapPinParameter.height + POINTER_HEIGHT)
    };

    if (mapContainerElement.classList.contains('map--faded')) {
      mainMapPinCoordinate.y = Math.round(mainMapPinParameter.top + mainMapPinParameter.height / 2);
    }

    addressInputElement.value = mainMapPinCoordinate.x + ', ' + mainMapPinCoordinate.y;
    return mainMapPinCoordinate;
  };

  /* Обработчик нажатия на label загрузки изображений /* */
  IMAGE_DROP_ZONE_SELECTORS.forEach(function (className) {
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

  guestCapacityElement.options.selectedIndex = (roomNumberElement.options.selectedIndex < ROOM_NUMBER_HUNDRED_INDEX) ? GUEST_CAPACITY_ONE_INDEX - roomNumberElement.options.selectedIndex : GUEST_CAPACITY_NONE_INDEX;

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
          message += ', ' + guestCapacityElement.options[abilityOptionIndexList[j]].text;
        } else {
          message += guestCapacityElement.options[abilityOptionIndexList[j]].text;
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

    flatPriceElement.min = flatMinimumPrice[currentFlatType];
    flatPriceElement.placeholder = flatMinimumPrice[currentFlatType];
  };

  flatTypeElement.addEventListener('change', onflatTypeChange);

  var checkInElement = document.querySelector('#timein');
  var checkOutElement = document.querySelector('#timeout');
  var onCheckinCheckoutChange = function (evt) {
    if (evt.target === checkInElement) {
      checkOutElement.options.selectedIndex = checkInElement.options.selectedIndex;
    } else {
      checkInElement.options.selectedIndex = checkOutElement.options.selectedIndex;
    }
  };

  checkInElement.addEventListener('change', onCheckinCheckoutChange);
  checkOutElement.addEventListener('change', onCheckinCheckoutChange);

  window.offer = {
    refreshAddressValue: refreshAddressValue,
    checkRoomsGuestsBalance: checkRoomsGuestsBalance,
    onflatTypeChange: onflatTypeChange
  };
})();
