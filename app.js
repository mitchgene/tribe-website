const navbar = document.querySelector('#navbar');
const body = document.querySelector('body');

// elements fade in on scroll

let options = {
  threshold: .4
};

const observer = new IntersectionObserver(fadeIn, options);

function fadeIn(elements) {
  elements.forEach(elem => {
    if (elem.isIntersecting) {
      elem.target.classList.add('show');
    }
  })
}


const fadedElements = document.querySelectorAll('.fadedElem');
const l_fadedElements = document.querySelectorAll('.l-fadedElem');
const r_fadedElements = document.querySelectorAll('.r-fadedElem');
const t_fadedElements = document.querySelectorAll('.t-fadedElem');
const b_fadedElements = document.querySelectorAll('.b-fadedElem');


fadedElements.forEach(el => {
  observer.observe(el);
})

l_fadedElements.forEach(el => {
  observer.observe(el);
})

r_fadedElements.forEach(el => {
  observer.observe(el);
})

t_fadedElements.forEach(el => {
  observer.observe(el);
})

b_fadedElements.forEach(el => {
  observer.observe(el);
})

const navBtn = document.querySelector('#nav-btn');
const navMobile = document.querySelector('.nav-mobile');
const mobileLink = document.querySelector('.nav-mobile-item');


// close nav menu when a link is clicked

window.addEventListener('click', (e) => {
  if (e.target !== navMobile && e.target !== navBtn) {
    navMobile.classList.remove('nav-active');
    navBtn.classList.remove('is-active');
  }
})

navBtn.addEventListener('click', function(e) {
  navMobile.classList.toggle('nav-active');
  navBtn.classList.toggle('is-active');
});
