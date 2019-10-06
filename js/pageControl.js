'use strict';

(function () {
  var loadOfferDataSuccess = function (data) {
    if (data) {
      var pinContainer = document.querySelector('.map__pins');
      var mapPinsFragment = window.pin.createOfferPins(data);
      /* var mapOffersFragment = window.card.createOfferCards(data);/* */
      pinContainer.appendChild(mapPinsFragment);
      /* var mapFiltersContainer = document.querySelector('.map__filters-container'); /* */

      /* mapFiltersContainer.before(mapOffersFragment);/* */
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

  var ENTER_KEYCODE = 13;

  var refreshAddressValue = function (element) {
    var elementParameters = {};
    elementParameters.Left = element.offsetLeft;
    elementParameters.Top = element.offsetTop;
    elementParameters.Width = element.offsetWidth;
    elementParameters.Height = element.offsetHeight;

    var POINTER_HEIGHT = 22;

    var formAdressInput = document.querySelector('#address');

    if (mapContainer.classList.contains('map--faded')) {
      formAdressInput.value = Math.round(elementParameters.Left + elementParameters.Width / 2) + ', ' + Math.round(elementParameters.Top + elementParameters.Height / 2);
    } else {
      formAdressInput.value = Math.round(elementParameters.Left + elementParameters.Width / 2) + ', ' + Math.round(elementParameters.Top + elementParameters.Height + POINTER_HEIGHT);
    }
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

  mainMapPin.addEventListener('mousedown', function () {
    pageDisableStatusChange(false);
  });

  mainMapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
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
