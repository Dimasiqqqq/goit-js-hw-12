import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import icon from './img/x-octagon.svg';

const userInput = document.querySelector('.data-select');
const userList = document.querySelector('.gallery-list');
const activeLoader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
const endMessage = document.querySelector('.end-message');

const PIXABAY_API_KEY = '42133778-4b8d89235d578f5a93c0f41d5';

const lightbox = new SimpleLightbox('.gallery-list a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let currentPage = 1;
let currentQuery = '';
const perPage = 15;
let totalHits = 0;

userInput.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userInputValue = userInput.elements.request.value.trim();
  currentQuery = userInputValue;

  if (!userInputValue) {
    return;
  }

  currentPage = 1;
  userList.innerHTML = '';
  toggleLoader();

  try {
    const data = await fetchGallery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.totalHits > 0) {
      renderGallery(data);

      if (data.hits.length < perPage) {
        showEndMessage();
      }
    } else {
      showErrorToast('Sorry, there are no images matching your search query. Please try again!');
    }
  } catch (error) {
    handleFetchError(error);
  } finally {
    toggleLoader();
    // Очистка лише полів форми, а не повний сброс форми
    userInput.elements.request.value = '';
  }
});

async function fetchGallery(query, page) {
  const searchParams = {
    key: PIXABAY_API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page: page,
  };

  const { data } = await axios.get('https://pixabay.com/api/', { params: searchParams });
  return data;
}

function renderGallery(data) {
  const cardHeight = document.querySelector('.gallery-item')?.getBoundingClientRect().height;

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

  // Плавна прокрутка до наступної групи зображень
  const newItems = data.hits.length;
  if (newItems > 0) {
    const scrollPosition = cardHeight * (currentPage - 1) * perPage;
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth',
    });
  }

  // Показати або приховати кнопку "Завантажити ще" та повідомлення про кінець
  if (data.totalHits > 0) {
    if (data.hits.length < perPage || data.hits.length + (currentPage - 1) * perPage >= data.totalHits) {
      showEndMessage();
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } else {
    hideLoadMoreButton();
    showEndMessage();
  }
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

function toggleLoader() {
  activeLoader.classList.toggle('loader-active');
}

function showLoadMoreButton() {
  loadMoreBtn.style.display = 'block';
  // Змінено текст кнопки для вказівки на завантаження додаткового контенту
  loadMoreBtn.innerText = 'Load More Images';
}

function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}

function showEndMessage() {
  endMessage.style.display = 'block';
  // Змінено текст повідомлення про кінець для вказівки на завершення колекції
  endMessage.innerText = 'End of Image Collection';
}

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;

  try {
    const data = await fetchGallery(currentQuery, currentPage);

    if (data.totalHits > 0) {
      renderGallery(data);

      if (data.hits.length < perPage || data.hits.length + (currentPage - 1) * perPage >= data.totalHits) {
        showEndMessage();
        hideLoadMoreButton();
      }
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    handleFetchError(error);
  }
});