import { createModalHandler } from './modal.js';

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureCancel = bigPictureModal.querySelector('.big-picture__cancel');
const socialComments = bigPictureModal.querySelector('.social__comments');
const socialCommentCount = bigPictureModal.querySelector('.social__comment-count');
const commentsLoader = bigPictureModal.querySelector('.comments-loader');

const COMMENTS_STEP = 5;
let commentsShown = 0;
let currentPhotoComments = [];

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');
  const commentImg = document.createElement('img');
  commentImg.classList.add('social__picture');
  commentImg.src = comment.avatar;
  commentImg.alt = comment.name;
  commentImg.width = 35;
  commentImg.height = 35;
  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;
  commentElement.appendChild(commentImg);
  commentElement.appendChild(commentText);
  return commentElement;
};

const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const commentsToRender = currentPhotoComments.slice(commentsShown, commentsShown + COMMENTS_STEP);

  commentsToRender.forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });

  socialComments.appendChild(fragment);
  commentsShown += commentsToRender.length;

  socialCommentCount.querySelector('.social__comment-shown-count').textContent = commentsShown;

  if (commentsShown >= currentPhotoComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const onCommentsLoaderClick = () => {
  renderComments();
};

const { openModal: openBigPictureModal } = createModalHandler(
  bigPictureModal,
  bigPictureCancel,
  () => {
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  },
  bigPictureModal
);

const initBigPictureModal = (photo) => {
  currentPhotoComments = photo.comments;
  commentsShown = 0;

  socialComments.innerHTML = '';
  bigPictureModal.querySelector('.big-picture__img img').src = photo.url;
  bigPictureModal.querySelector('.likes-count').textContent = photo.likes;
  bigPictureModal.querySelector('.social__caption').textContent = photo.description;
  bigPictureModal.querySelector('.social__comment-total-count').textContent = currentPhotoComments.length;

  renderComments();

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  openBigPictureModal();
};

export { initBigPictureModal };
