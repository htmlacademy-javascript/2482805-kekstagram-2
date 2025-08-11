import '../vendor/pristine/pristine.min.js';

const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validateHashtags = (value) => {
  if (value.length === 0) {
    return true;
  }
  const hashtags = value.split(' ').filter((tag) => tag.length > 0);
  if (hashtags.length > 5) {
    return false;
  }
  const lowerCaseHashtags = hashtags.map((tag) => tag.toLowerCase());
  const hasDuplicates = new Set(lowerCaseHashtags).size !== lowerCaseHashtags.length;
  if (hasDuplicates) {
    return false;
  }
  const isValid = hashtags.every((tag) => {
    const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
    return hashtagRegex.test(tag);
  });
  return isValid;
};

pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  'Хэштеги должны начинаться с #, не содержать спецсимволов, быть длиной до 20 символов и их должно быть не более 5 без повторов.',
);

const validateDescription = (value) => value.length <= 140;

pristine.addValidator(
  descriptionInput,
  validateDescription,
  'Длина комментария не может превышать 140 символов'
);

export const validatePristine = () => pristine.validate();
export const resetPristine = () => pristine.reset();
