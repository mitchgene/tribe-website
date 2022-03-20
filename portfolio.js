// loading buttons

const loadBtn = document.querySelector('.load-btn');
const body = document.querySelector('body');

window.addEventListener('load', function(e) {
  setTimeout(() => {
    loadBtn.classList.remove('is-loading')
  }, 800);
});
