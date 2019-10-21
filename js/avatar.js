'use strict';

(function () {
  var FLAT_PHOTO_WIDTH = 70;
  var FLAT_PHOTO_HEIGHT = 70;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooserElement = document.querySelector('#avatar');
  var avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
  var flatPhotoFileChooserElement = document.querySelector('#images');
  var flatPhotoPreviewElement = document.querySelector('.ad-form__photo');

  var setPrevievForFilechooser = function (fileChooserElement, priviewElement) {
    fileChooserElement.addEventListener('change', function () {
      var file = fileChooserElement.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          switch (priviewElement.tagName.toLowerCase()) {
            case 'img':
              priviewElement.src = reader.result;
              break;
            case 'div':
              var imagePreview = priviewElement.querySelector('img');
              if (!imagePreview) {
                imagePreview = document.createElement('img');
                imagePreview.setAttribute('width', FLAT_PHOTO_WIDTH);
                imagePreview.setAttribute('heigth', FLAT_PHOTO_HEIGHT);
                imagePreview.src = reader.result;
                priviewElement.appendChild(imagePreview);
              } else {
                imagePreview.src = reader.result;
              }
          }
        });
        reader.readAsDataURL(file);
      }
    });
  };

  setPrevievForFilechooser(avatarFileChooserElement, avatarPreviewElement);
  setPrevievForFilechooser(flatPhotoFileChooserElement, flatPhotoPreviewElement);

  var resetPreview = function () {
    avatarPreviewElement.src = 'img/avatars/default.png';
    flatPhotoPreviewElement.querySelectorAll('img').forEach(function (item) {
      item.remove();
    });
  };

  window.avatar = {
    resetPreview: resetPreview
  };
})();
