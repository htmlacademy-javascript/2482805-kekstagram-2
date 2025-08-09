import { renderPictures } from './gallery.js';
import './form.js';
import { getData } from './api.js';

const photosContainer = document.querySelector('.pictures');

const getPhotos = async () => {
  try {
    const photos = await getData();
    renderPictures(photos);
  } catch (err) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = err.message;
    photosContainer.appendChild(errorMessage);
  }
};

getPhotos();
