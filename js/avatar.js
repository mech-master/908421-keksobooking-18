'use strict';

(function () {
  var FLAT_PHOTO_WIDTH = 70;
  var FLAT_PHOTO_HEIGHT = 70;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooserElement = document.querySelector('#avatar');
  var avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
  var flatPhotoFileChooserElement = document.querySelector('#images');
  var flatPreviewContainerElement = document.querySelector('.ad-form__photo');

  var setPreviewFilechooser = function (fileChooserElement, previewElement) {
    var file = fileChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewElement.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  avatarFileChooserElement.addEventListener('change', function () {
    setPreviewFilechooser(avatarFileChooserElement, avatarPreviewElement);
  });

  flatPhotoFileChooserElement.addEventListener('change', function () {
    var imagePreview = flatPreviewContainerElement.querySelector('img');
    if (!imagePreview) {
      imagePreview = document.createElement('img');
      imagePreview.setAttribute('width', FLAT_PHOTO_WIDTH);
      imagePreview.setAttribute('heigth', FLAT_PHOTO_HEIGHT);
      flatPreviewContainerElement.appendChild(imagePreview);
    }
    setPreviewFilechooser(flatPhotoFileChooserElement, imagePreview);
  });

  var resetPreview = function () {
    avatarPreviewElement.src = 'img/avatars/default.png';
    flatPreviewContainerElement.querySelectorAll('img').forEach(function (item) {
      item.remove();
    });
  };

  window.avatar = {
    resetPreview: resetPreview
  };
})();
