'use strict';

/* Загрузка и фильтрация данных /* */

(function () {
  var DEBOUNCE_DELAY = 500;

  window.filter = {
    offerList: '',
    isDataLoaded: false
  };

  var onDataSuccessLoaded = function (data) {
    if (data) {
      var filteredOffers = filterIncomingData(data);
      window.filter.offerList = data;
      window.pin.fillPinContainer(filteredOffers);
      window.filter.isDataLoaded = true;
      window.pageControl.changePageStatus(false);
    }
  };

  var loadOfferData = function () {
    try {
      window.backend.load(onDataSuccessLoaded, window.common.onErrorMessageShow);
    } catch (err) {
      throw new Error('Ошибка ' + err.name + ' : ' + err.message + '\n' + err.stack);
    }
  };

  var filterFormElement = document.querySelector('.map__filters');
  var featuresContainerElement = filterFormElement.querySelector('.map__features');
  var flatTypeElement = filterFormElement.querySelector('#housing-type');
  var flatPriceElement = filterFormElement.querySelector('#housing-price');
  var flatRoomsElement = filterFormElement.querySelector('#housing-rooms');
  var flatGuestsElement = filterFormElement.querySelector('#housing-guests');

  var filterIncomingData = function (data) {
    return data.filter(function (item) {
      var flatTypeValue = flatTypeElement.options[flatTypeElement.options.selectedIndex].value;
      if (flatTypeValue !== 'any' &&
        item.offer.type !== flatTypeValue) {
        return false;
      }

      switch (flatPriceElement.options[flatPriceElement.options.selectedIndex].value) {
        case 'any':
          break;
        case 'middle':
          if (item.offer.price < 10000 || item.offer.price > 50000) {
            return false;
          }
          break;
        case 'low':
          if (item.offer.price > 10000) {
            return false;
          }
          break;
        case 'high':
          if (item.offer.price < 50000) {
            return false;
          }
          break;
      }

      var flatRoomsValue = flatRoomsElement.options[flatRoomsElement.options.selectedIndex].value;

      if (flatRoomsValue !== 'any' && parseInt(flatRoomsValue, 10) !== item.offer.rooms) {
        return false;
      }

      var flatGuestsValue = flatGuestsElement.options[flatGuestsElement.options.selectedIndex].value;

      if (flatGuestsValue !== 'any' && parseInt(flatGuestsValue, 10) !== item.offer.guests) {
        return false;
      }

      var inputCheckedElements = featuresContainerElement.querySelectorAll('.map__checkbox:checked');
      for (var m = 0; m < inputCheckedElements.length; m++) {
        if (item.offer.features.indexOf(inputCheckedElements[m].value) === -1) {
          return false;
        }
      }
      return true;
    });
  };

  var lastTimer;
  var onFilterChange = function () {
    if (lastTimer) {
      window.clearTimeout(lastTimer);
    }

    lastTimer = window.setTimeout(window.pin.fillPinContainer(filterIncomingData(window.filter.offerList)), DEBOUNCE_DELAY);
  };

  var onFilterSelectChange = function () {
    onFilterChange();
  };

  var onFilterInputEnterPressed = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'input' && evt.keyCode === window.common.Keycode.ENTER) {
      evt.target.checked = evt.target.checked ? false : true;
      onFilterChange();
    }
  };

  /* Создание обработчиков событий изменения Select и выбора Input /* */

  var filtersContainerElement = document.querySelector('.map__filters');

  filtersContainerElement.addEventListener('change', onFilterSelectChange);
  filtersContainerElement.addEventListener('keydown', onFilterInputEnterPressed);

  window.filter['loadOfferData'] = loadOfferData;
  window.filter['filterIncomingData'] = filterIncomingData;
})();
