'use strict';

(function () {
  var SUCCESS_STATUS = 200;
  var ANSWER_TIMEOUT = 10000;

  window.backend = {
    operationType: 'load',
    exchangeData: function (onLoad, onError, data) {
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

      switch (this.operationType) {
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
    },
    load: function (onLoad, onError) {
      this.operationType = 'load';
      this.exchangeData(onLoad, onError);
    },
    save: function (data, onLoad, onError) {
      this.operationType = 'save';
      this.exchangeData(onLoad, onError, data);
    }
  };
})();
