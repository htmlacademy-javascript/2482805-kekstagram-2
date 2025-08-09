import { createModalHandler } from './modal.js';
import { validatePristine, resetPristine } from './pristine.js';
import { initSlider, resetSlider } from './slider.js';
import { sendData } from './api.js';

const uploadForm = document.querySelector('.img-upload__form');
uploadForm.action = 'https://28.javascript.pages.academy/kekstagram';
uploadForm.method = 'post';
uploadForm.enctype = 'multipart/form-data';
const uploadFileInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');

initSlider();

const resetAll = () => {
  uploadForm.reset();
  resetPristine();
  resetSlider();
};

const { openModal: openUploadForm, closeModal: closeUploadForm } = createModalHandler(
  uploadOverlay,
  uploadCancel,
  resetAll,
  uploadOverlay
);

uploadFileInput.addEventListener('change', () => {
  openUploadForm();
});

const showErrorMessage = (message) => {
  const errorMessageContainer = document.createElement('div');
  errorMessageContainer.style.zIndex = '1000';
  errorMessageContainer.style.position = 'absolute';
  errorMessageContainer.style.left = '0';
  errorMessageContainer.style.top = '0';
  errorMessageContainer.style.right = '0';
  errorMessageContainer.style.padding = '10px 3px';
  errorMessageContainer.style.fontSize = '30px';
  errorMessageContainer.style.textAlign = 'center';
  errorMessageContainer.style.backgroundColor = 'red';
  errorMessageContainer.textContent = message;
  document.body.append(errorMessageContainer);

  setTimeout(() => {
    errorMessageContainer.remove();
  }, 5000);
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();
  const isValid = validatePristine();
  if (isValid) {
    const formData = new FormData(uploadForm);
    try {
      await sendData(formData);
      closeUploadForm();
    } catch (err) {
      showErrorMessage(err.message);
    }
  }
};

uploadForm.addEventListener('submit', onFormSubmit);
