const isEscapeKey = (evt) => evt.key === 'Escape';

const createModalHandler = (modalElement, closeButton, closeCallback, outsideClickArea) => {
  const onEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal();
    }
  };

  const onOutsideClick = (evt) => {
    if (evt.target === outsideClickArea) {
      closeModal();
    }
  };

  function closeModal() {
    modalElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscKeydown);
    outsideClickArea.removeEventListener('click', onOutsideClick);
    if (closeCallback) {
      closeCallback();
    }
  }

  const openModal = () => {
    modalElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onEscKeydown);
    outsideClickArea.addEventListener('click', onOutsideClick);
  };

  closeButton.addEventListener('click', closeModal);

  return { openModal, closeModal };
};

export { createModalHandler };
