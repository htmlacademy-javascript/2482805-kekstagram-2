import { renderPictures } from './gallery.js';
import './form.js';
import { getData } from './api.js';
import { setOnFilterClick } from './filter.js';

const photosContainer = document.querySelector('.pictures');

const getPhotos = async () => {
  try {
    const photos = await getData();
    renderPictures(photos);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    setOnFilterClick(photos);
  } catch (err) {
    const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
    const dataErrorMessage = dataErrorTemplate.cloneNode(true);
    photosContainer.appendChild(dataErrorMessage);

    setTimeout(() => {
      dataErrorMessage.remove();
    }, 5000);
  }
};

getPhotos();
