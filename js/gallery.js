import { initBigPictureModal } from './big-picture-mode.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictureElement = (element) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = element.url;
  pictureElement.querySelector('.picture__img').alt = element.description;
  pictureElement.querySelector('.picture__comments').textContent = element.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = element.likes;

  pictureElement.addEventListener('click', () => {
    initBigPictureModal(element);
  });
  return pictureElement;
};

const renderPictures = (pictures) => {
  const fragmentPictures = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const pictureElement = renderPictureElement(picture);
    fragmentPictures.appendChild(pictureElement);
  });
  picturesContainer.appendChild(fragmentPictures);
};

export { renderPictures };
