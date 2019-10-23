'use strict';

(function () {
  var SUCCESS_STATUS = 200;
  var ANSWER_TIMEOUT = 10000;

  var operationType = 'load';
  var exchangeData = function (onLoad, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.multipart = true;
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения!');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс.');
    });

    xhr.timeout = ANSWER_TIMEOUT;

    switch (operationType) {
      case 'load':
        xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
        xhr.send();
        break;
      case 'save':
        xhr.open('POST', 'https://js.dump.academy/keksobooking');
        xhr.send(data);
        break;
      default:
        onError('Не определен тип операции');
    }
  };

  var onDataLoad = function (onLoad, onError) {
    operationType = 'load';
    exchangeData(onLoad, onError);
  };
  var onDataSave = function (data, onLoad, onError) {
    operationType = 'save';
    exchangeData(onLoad, onError, data);
  };

  window.backend = {
    load: onDataLoad,
    save: onDataSave
  };
})();
