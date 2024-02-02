import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import icon from './img/x-octagon.svg';

const userInput = document.querySelector('.data-select');
const userList = document.querySelector('.gallery-list');
const activeLoader = document.querySelector('.loader');

const PIXABAY_API_KEY = '42133778-4b8d89235d578f5a93c0f41d5';

const lightbox = new SimpleLightbox('.gallery-list a', {
  captionsData: 'alt',
  captionDelay: 250,
});

userInput.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userInputValue = userInput.elements.request.value.trim();
  userList.innerHTML = '';
  activeLoader.classList.toggle('loader-active');

  try {
    const searchParams = new URLSearchParams({
      key: PIXABAY_API_KEY,
      q: userInputValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });

    const data = await fetchGallery(searchParams);

    if (data.totalHits > 0) {
      renderGallery(data);
    } else {
      showErrorToast('Sorry, there are no images matching your search query. Please try again!');
    }
  } catch (error) {
    handleFetchError(error);
  } finally {
    activeLoader.classList.toggle('loader-active');
    userInput.reset();
  }
});

async function fetchGallery(searchParams) {
  const response = await fetch(`https://pixabay.com/api/?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error(response.status);
  }

  return response.json();
}

function renderGallery(data) {
  const markup = data.hits
    .map((hit) => {
      return `<li class="gallery-item">
          <a class="gallery-link" href="${hit.largeImageURL}">
            <img
              class="gallery-image"
              src="${hit.webformatURL}"
              alt="${hit.tags}"
              width="360"
              height="200"
            />
            <ul class="info-list">
              <li class="info-item">
                <h2 class="item-title">Likes</h2>
                <p class="item-content">${hit.likes}</p>
              </li>
              <li class="info-item">
                <h2 class="item-title">Views</h2>
                <p class="item-content">${hit.views}</p>
              </li>
              <li class="info-item">
                <h2 class="item-title">Comments</h2>
                <p class="item-content">${hit.comments}</p>
              </li>
              <li class="info-item">
                <h2 class="item-title">Downloads</h2>
                <p class="item-content">${hit.downloads}</p>
              </li>
            </ul>
          </a>
        </li>`;
    })
    .join('');

  userList.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

function showErrorToast(message) {
  iziToast.error({
    message,
    messageColor: '#FAFAFB',
    messageSize: '16',
    messageLineHeight: '20',
    position: 'topRight',
    backgroundColor: '#EF4040',
    iconUrl: icon,
    icon: 'fa-regular',
    iconColor: '#FAFAFB',
    maxWidth: '500',
    transitionIn: 'bounceInLeft',
  });
}

function handleFetchError(error) {
  if (error.message.includes('404')) {
    showErrorToast('Oops! The requested resource was not found.');
  } else if (error.message.includes('500')) {
    showErrorToast('Oops! Something went wrong on the server. Please try again later.');
  } else {
    showErrorToast('Oops! An unexpected error occurred. Please try again.');
  }
}