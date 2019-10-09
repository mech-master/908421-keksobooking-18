'use strict';

(function () {
  window.backend = {
    operationType: 'load',
    load: function (onLoad, onError) {
      this.operationType = 'load';
      this.exchangeData(onLoad, onError);
    },
    exchangeData: function (onLoad, onError, data) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
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

      xhr.timeout = 10000;

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
    }
  };
})();
