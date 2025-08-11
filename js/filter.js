import { renderPictures } from './gallery.js';

const filterForm = document.querySelector('.img-filters__form');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const setOnFilterClick = (photos) => {
  filterForm.addEventListener('click', (evt) => {
    const targetButton = evt.target.closest('.img-filters__button');

    if (targetButton) {
      const currentActiveButton = filterForm.querySelector('.img-filters__button--active');

      if (currentActiveButton === targetButton) {
        return;
      }

      currentActiveButton.classList.remove('img-filters__button--active');

      targetButton.classList.add('img-filters__button--active');


      let filteredPhotos = [];
      switch (targetButton) {
        case filterDefaultButton:
          filteredPhotos = photos;
          break;
        case filterRandomButton:
          filteredPhotos = photos.slice().sort(() => Math.random() - 0.5).slice(0, 10);
          break;
        case filterDiscussedButton:
          filteredPhotos = photos.slice().sort((photoA, photoB) => photoB.comments.length - photoA.comments.length);
          break;
      }

      debounce(() => renderPictures(filteredPhotos))();
    }
  });
};

export { setOnFilterClick };
