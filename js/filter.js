'use strict';

/* Загрузка и фильтрация данных /* */

(function () {
  window.filter = {
    offerList: '',
    isDataLoaded: false
  };

  var loadOfferDataSuccess = function (data) {
    if (data) {
      var filterdOffers = filterIncomingData(data);
      window.filter.offerList = data;
      window.pin.fillPinContainer(filterdOffers);
      window.filter.isDataLoaded = true;
      window.pageControl.pageDisableStatusChange(false);
    }
  };

  var loadOfferData = function () {
    try {
      window.backend.load(loadOfferDataSuccess, window.common.onErrorMessageShow);
    } catch (err) {
      throw new Error('Ошибка ' + err.name + ' : ' + err.message + '\n' + err.stack);
    }
  };

  /* var filterControlElements = ['#housing-type', '#housing-price', '#housing-rooms', '#housing-guests', '#filter-wifi', '#filter-dishwasher', '#filter-parking', '#filter-washer', '#filter-elevator', '#filter-conditioner'];/* */
  var filterForm = document.querySelector('.map__filters');
  var filterSelectElements = filterForm.querySelectorAll('select');
  var fuaturesFieldset = filterForm.querySelector('.map__features');
  var filterInputElements = fuaturesFieldset.querySelectorAll('input');

  var filterIncomingData = function (data) {
    var flatType = filterForm.querySelector('#housing-type');
    var flatPrice = filterForm.querySelector('#housing-price');
    var flatRooms = filterForm.querySelector('#housing-rooms');
    var flatGuests = filterForm.querySelector('#housing-guests');
    return data.filter(function (item) {
      var result = true;

      if (flatType.options[flatType.options.selectedIndex].value !== 'any' &&
        item.offer.type !== flatType.options[flatType.options.selectedIndex].value) {
        result = false;
      }

      if (!result) {
        return result;
      }

      switch (flatPrice.options[flatPrice.options.selectedIndex].value) {
        case 'any':
          break;
        case 'middle':
          if (item.offer.price < 10000 || item.offer.price > 50000) {
            result = false;
          }
          break;
        case 'low':
          if (item.offer.price > 10000) {
            result = false;
          }
          break;
        case 'high':
          if (item.offer.price < 50000) {
            result = false;
          }
      }

      if (!result) {
        return result;
      }

      if (flatRooms.options[flatRooms.options.selectedIndex].value !== 'any' && parseInt(flatRooms.options[flatRooms.options.selectedIndex].value, 10) !== item.offer.rooms) {
        result = false;
      }

      if (!result) {
        return result;
      }

      if (flatGuests.options[flatGuests.options.selectedIndex].value !== 'any' && parseInt(flatGuests.options[flatGuests.options.selectedIndex].value, 10) !== item.offer.guests) {
        result = false;
      }

      if (!result) {
        return result;
      }
      var filterInputCheckedElements = fuaturesFieldset.querySelectorAll('.map__checkbox:checked');
      if (filterInputCheckedElements) {
        filterInputCheckedElements.forEach(function (feature) {
          if (item.offer.features.indexOf(feature.value) === -1) {
            result = false;
          }
        });
      }
      return result;
    });
  };

  var lastTimer;
  var DEBOUNCE_DELAY = 500;

  var onFilterChange = function (evt) {
    if (evt.type === 'change' || evt.type === 'click' || (evt.type === 'keydown' && evt.keyCode === window.common.Keycode.ENTER)) {
      if (evt.target.tagName.toLowerCase() === 'input' && evt.type === 'keydown') {
        if (evt.target.checked) {
          evt.target.checked = false;
        } else {
          evt.target.checked = true;
        }
      }
      if (lastTimer) {
        window.clearTimeout(lastTimer);
      }

      lastTimer = window.setTimeout(window.pin.fillPinContainer(filterIncomingData(window.filter.offerList)), DEBOUNCE_DELAY);
    }
  };

  /* Создание обработчиков событий изменения Select и выбора Input /* */

  filterSelectElements.forEach(function (item) {
    item.addEventListener('change', onFilterChange);
  });

  filterInputElements.forEach(function (item) {
    item.addEventListener('click', onFilterChange);
    item.addEventListener('keydown', onFilterChange);
  });

  window.filter['loadOfferData'] = loadOfferData;
  window.filter['filterIncomingData'] = filterIncomingData;
})();
