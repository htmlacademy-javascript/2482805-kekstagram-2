import '../vendor/nouislider/nouislider.js';

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const RADIX_BASE = 10;


const EFFECTS_CONFIG = {
  none: {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  chrome: {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const uploadForm = document.querySelector('.img-upload__form');
const scaleControl = uploadForm.querySelector('.scale__control--value');
const scaleSmallerButton = uploadForm.querySelector('.scale__control--smaller');
const scaleBiggerButton = uploadForm.querySelector('.scale__control--bigger');
const imagePreview = uploadForm.querySelector('.img-upload__preview img');
const effectsFieldset = uploadForm.querySelector('.img-upload__effects');
const effectSliderContainer = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelSlider = uploadForm.querySelector('.effect-level__slider');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');

let currentEffect = EFFECTS_CONFIG.none;

const scaleImage = (value) => {
  imagePreview.style.transform = `scale(${value / MAX_SCALE})`;
  scaleControl.value = (`${value}%`);
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

const initSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });
  effectSliderContainer.classList.add('hidden');

  scaleSmallerButton.addEventListener('click', () => {
    let currentValue = parseInt(scaleControl.value, RADIX_BASE);
    if (currentValue > MIN_SCALE) {
      currentValue -= SCALE_STEP;
      scaleImage(currentValue);
    }
  });

  scaleBiggerButton.addEventListener('click', () => {
    let currentValue = parseInt(scaleControl.value, RADIX_BASE);
    if (currentValue < MAX_SCALE) {
      currentValue += SCALE_STEP;
      scaleImage(currentValue);
    }
  });

  effectsFieldset.addEventListener('change', (evt) => {
    imagePreview.className = '';
    currentEffect = EFFECTS_CONFIG[evt.target.value];

    if (currentEffect.name === 'none') {
      imagePreview.style.filter = '';
      effectSliderContainer.classList.add('hidden');
    } else {
      imagePreview.classList.add(`effects__preview--${currentEffect.name}`);
      effectSliderContainer.classList.remove('hidden');
    }

    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: currentEffect.min,
        max: currentEffect.max,
      },
      start: currentEffect.max,
      step: currentEffect.step,
    });
  });

  effectLevelSlider.noUiSlider.on('update', () => {
    const sliderValue = effectLevelSlider.noUiSlider.get();
    effectLevelValue.value = parseFloat(sliderValue);
    if (currentEffect.name === 'none') {
      imagePreview.style.filter = '';
    } else {
      imagePreview.style.filter = `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
    }
  });
};

const resetSlider = () => {
  resetScale();
  currentEffect = EFFECTS_CONFIG.none;
  imagePreview.style.filter = '';
  imagePreview.className = '';
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max
    },
    start: currentEffect.max,
    step: currentEffect.step
  });
  effectSliderContainer.classList.add('hidden');
};

export { initSlider, resetSlider };
