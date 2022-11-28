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


fadedElements.forEach(el => { observer.observe(el); })

l_fadedElements.forEach(el => { observer.observe(el); })

r_fadedElements.forEach(el => { observer.observe(el); })

t_fadedElements.forEach(el => { observer.observe(el); })

b_fadedElements.forEach(el => { observer.observe(el); })

// fade on load

const slowLoads = document.querySelectorAll('.slow-load');

slowLoads.forEach(element => {
  element.addEventListener('load', () => {
    element.classList.remove('slow-load');
  });
});

// navigation

const navBtn = document.querySelector('#nav-btn');
const navMobile = document.querySelector('.nav-mobile');
const mobileLink = document.querySelector('.nav-mobile-item');
const blurFilter = document.querySelector('.blur-filter');

// close nav menu when a link is clicked

window.addEventListener('click', (e) => {
  if (e.target !== navMobile && e.target !== navBtn) {
    blurFilter.classList.remove('is-active')
    navMobile.classList.remove('nav-active');
    navBtn.classList.remove('is-active');
  }
})

navBtn.addEventListener('click', function(e) {
  blurFilter.classList.toggle('is-active')
  navMobile.classList.toggle('nav-active');
  navBtn.classList.toggle('is-active');
});

// tabs

const tabs = document.querySelectorAll('.tabs li');
const tabContentBoxes = document.querySelectorAll('#tab-content > div');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(item => item.classList.remove('is-active'));
    tab.classList.add('is-active');

    const target = tab.dataset.target;
    tabContentBoxes.forEach(box => {
      if (box.getAttribute('id') === target) {
        box.classList.remove('is-hidden');
      } else {
        box.classList.add('is-hidden');
      }
    })
  })
})

// form

//  get form field elements

const name = document.querySelector('#inputName');
const nameIcon = document.querySelector('#name-icon');
const email = document.querySelector('#email-input');
const emailIcon = document.querySelector('#email-icon');
const business = document.querySelector('#business-input');
const businessIcon = document.querySelector('#business-icon');
const phone = document.querySelector('#phone-input');
const phoneIcon = document.querySelector('#phone-icon');
const submitBtn = document.querySelector('#submit-btn');

//phone number input mask (___) ___-____

phone.addEventListener('input', function(y) {
  var a = y.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  y.target.value = !a[2] ? a[1] : '(' + a[1] + ') ' + a[2] + (a[3] ? '-' + a[3] : '');
});

// put form field in array

const inputs = [name, email, business, phone];

function _(el) {
  return document.querySelector(el);
}

const contactForm = _('.contact-form');

const form = {
  form: _('.contact-form'),
  name: _('#inputName'),
  email: _('#email-input'),
  business: _('#business-input'),
  phone: _('#phone-input'),
  message: _('#message')
}

// contact form validation

function checkInputs() {

  const nameValue = name.value.trim();
  const emailValue = email.value.trim();
  const businessValue = business.value.trim();
  const phoneValue = phone.value.trim();

  if (nameValue === '') {
    setErrorFor(name);
  } else if (!name.validity.valid) {
    setErrorFor(name)
  } else {
    setSuccessFor(name);
  }

  if (emailValue === '') {
    setErrorFor(email);
  }

  if (!email.validity.valid) {
    setErrorFor(email);
  } else {
    setSuccessFor(email);
  }
}

function checkInput(input) {
  const inputValue = input.value;
  const formControl = input.parentElement;
  const formIcons = [...formControl.querySelectorAll('i')];
  if (input.validity.valid && input.hasAttribute('required')) {
    setSuccessFor(input);
  } else if (inputValue === '' && input.hasAttribute('required')) {
    setErrorFor(input);
  } else if (inputValue === '' && !input.hasAttribute('required')) {
    input.className = 'input';
    formIcons[1].className = '';
  } else if (inputValue.length > 2 && !input.hasAttribute('required')) {
    setSuccessFor(input);
  } else if (input === name && inputValue.length < 3) {
    setErrorFor(input);
  } else if (input === email && !input.validity.valid) {
    setErrorFor(input);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const span = formControl.querySelector('span');
  const formIcons = [...formControl.querySelectorAll('i')];
  input.className = 'input is-danger has-background-danger-light';
  formIcons[1].className = 'fas fa-exclamation has-text-danger';
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  const span = formControl.querySelector('span');
  const formIcons = [...formControl.querySelectorAll('i')];
  input.className = 'input is-success has-background-success-light';
  formIcons[1].className = 'fas fa-check has-text-success';
}

inputs.forEach(input => {
  input.addEventListener('focusout', () => {
    checkInput(input);
  })
})

submitBtn.addEventListener('click', () => {
  inputs.forEach(input => {
    checkInput(input);
  })
})

// ajax call - error || success message

const content = _('#content')

contactForm.addEventListener('submit', function(e) {

  e.preventDefault();

  function resetForm(input) {
    const formControl = input.parentElement;
    const span = formControl.querySelector('span');
    const formIcons = [...formControl.querySelectorAll('i')];
    input.className = 'input';
    formIcons[1].className = '';
    form.form.reset();
  }

  function showMessage(time, success, message) {
    if (success === true) {
      content.innerHTML = "<i class='fa fa-check fa-lg has-text-success mx-2'></i> " + message;
    } else {
      if (success === false) {
        content.innerHTML = "<i class='fa fa-exclamation-triangle fa-lg has-text-danger mx-2'></i> " + message;
      }
    }

    content.classList.remove('opacity-0');

    setTimeout(() => {
      content.classList.add('opacity-0');
    }, time);

    setTimeout(() => {
      content.innerText = '|';
    }, time + 1500);
  }

  if (contactForm.checkValidity() == true) {

    submitBtn.classList.add('is-loading');

    const dataPack = new FormData(contactForm);

    const request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        console.log(this.readyState);

        console.log(this.responseText);

        showMessage(8000, true, "Message sent!  Thank you for contacting us.");

        submitBtn.classList.remove('is-loading');

        inputs.forEach(input => {
          resetForm(input);
        })
      } else if (this.status >= 400) {

        showMessage(8000, false, "Oops! There was an error, please try again later.");

        submitBtn.classList.remove('is-loading');

        inputs.forEach(input => {
          resetForm(input);
        })
      }
    };

    request.open('POST', 'contact.php')

    request.onerror = function() {

      showMessage(8000, false, "Oops!  There was an error, please try again later.");
    }

    request.send(dataPack);

  }
});
