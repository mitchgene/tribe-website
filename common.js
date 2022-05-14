// loading buttons

const loadBtn = document.querySelector('.load-btn');

window.addEventListener('load', function(e) {
  spinLoad();
});

function spinLoad() {
  setTimeout(() => {
    loadBtn.classList.remove('is-loading')
  }, 600);
}

// fade on loadBtn
