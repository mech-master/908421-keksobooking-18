'use strict';

(function () {
  var FLAT_PHOTO_WIDTH = 70;
  var FLAT_PHOTO_HEIGHT = 70;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var flatPhotoFileChooser = document.querySelector('#images');
  var flatPhotoPreview = document.querySelector('.ad-form__photo');

  var setPrevievForFilechooser = function (fileChooserElement, elementPriview) {
    fileChooserElement.addEventListener('change', function () {
      var file = fileChooserElement.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          switch (elementPriview.tagName.toLowerCase()) {
            case 'img':
              elementPriview.src = reader.result;
              break;
            case 'div':
              var imagePreview = elementPriview.querySelector('img');
              if (!imagePreview) {
                imagePreview = document.createElement('img');
                imagePreview.setAttribute('width', FLAT_PHOTO_WIDTH);
                imagePreview.setAttribute('heigth', FLAT_PHOTO_HEIGHT);
                imagePreview.src = reader.result;
                elementPriview.appendChild(imagePreview);
              } else {
                imagePreview.src = reader.result;
              }
          }
        });
        reader.readAsDataURL(file);
      }
    });
  };

  setPrevievForFilechooser(avatarFileChooser, avatarPreview);
  setPrevievForFilechooser(flatPhotoFileChooser, flatPhotoPreview);

  var onPreviewReset = function () {
    avatarPreview.src = 'img/avatars/default.png';
    flatPhotoPreview.querySelectorAll('img').forEach(function (item) {
      item.remove();
    });
  };

  window.avatar = {
    onPreviewReset: onPreviewReset
  };
})();
