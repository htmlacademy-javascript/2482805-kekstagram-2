import { createModalHandler } from './modal.js';
import { validatePristine, resetPristine } from './pristine.js';
import { initSlider, resetSlider } from './slider.js';
import { sendData } from './api.js';

const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const imagePreview = uploadOverlay.querySelector('.img-upload__preview img');
const effectsPreviews = uploadOverlay.querySelectorAll('.effects__preview');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

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
  uploadOverlay,
  hashtagsInput,
  descriptionInput
);

const showMessage = (template, messageText) => {
  const messageElement = template.cloneNode(true);
  const titleElement = messageElement.querySelector('.error__title');

  if (messageText) {
    titleElement.textContent = messageText;
  }

  body.append(messageElement);

  const closeMessage = () => {
    messageElement.remove();
  };

  const closeButton = messageElement.querySelector('button');
  const outsideClickArea = messageElement;

  const { openModal, closeModal } = createModalHandler(
    messageElement,
    closeButton,
    closeMessage,
    outsideClickArea
  );

  closeButton.addEventListener('click', closeModal);

  openModal();
};

uploadFileInput.addEventListener('change', () => {
  const file = uploadFileInput.files[0];

  if (!file || !file.type.startsWith('image/')) {
    showMessage(errorTemplate, 'Загружаемый файл должен быть изображением');
    uploadFileInput.value = '';
    return;
  }

  const objectURL = URL.createObjectURL(file);
  imagePreview.src = objectURL;
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${objectURL})`;
  });
  openUploadForm();
});

const onFormSubmit = async (evt) => {
  evt.preventDefault();
  const isValid = validatePristine();
  if (isValid) {
    const submitButton = uploadForm.querySelector('.img-upload__submit');
    const formData = new FormData(uploadForm);
    submitButton.setAttribute('disabled', 'true');
    try {
      await sendData(formData);
      closeUploadForm();
      showMessage(successTemplate);
      submitButton.removeAttribute('disabled');
      body.classList.remove('modal-open');
    } catch (err) {
      showMessage(errorTemplate);
      submitButton.removeAttribute('disabled');
    }
  }
};

uploadForm.addEventListener('submit', onFormSubmit);
