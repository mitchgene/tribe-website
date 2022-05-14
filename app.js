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

// fade on load

const slowLoads = document.querySelectorAll('.slow-load');

Array.from(slowLoads).forEach(element => {
    element.addEventListener('load', (e) => {
      element.classList.remove('slow-load');
    });
  }

)

// tabs

const tabs = document.querySelectorAll('.tabs li');
const tabContentBoxes = document.querySelectorAll('#tab-content > div');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(item => item.classList.remove('is-active'));
    tab.classList.add('is-active');

    const target = tab.dataset.target;
    console.log(target);
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

const nameInput = document.querySelector('#inputName');
const nameIcon = document.querySelector('#name-icon');
const emailInput = document.querySelector('#email-input');
const emailIcon = document.querySelector('#email-icon');
const businessInput = document.querySelector('#business-input');
const businessIcon = document.querySelector('#business-icon');
const phoneInput = document.querySelector('#phone-input');
const phoneIcon = document.querySelector('#phone-icon');
const submitBtn = document.querySelector('#submit-btn');

// put form field in array

const inputs = [nameInput, emailInput, businessInput, phoneInput];

// signal validity of elements with css classes

function validateInput(input) {
  if (input.hasAttribute('required') &&
    input.validity.valid) {
      if (input.name === 'email')
       {
        emailIcon.classList.remove('fa-envelope');
        emailIcon.classList.add('fa-check', 'has-text-success');
      }
    input.classList.remove(
      'is-danger',
      'has-background-danger-light'
    );
    input.classList.add(
      'is-success',
      'has-background-success-light'
    );
  }
  if (!input.hasAttribute('required') &&
    input.validity.valueMissing) {
    input.classList.remove(
      'is-danger',
      'has-background-danger-light'
    );
    input.classList.remove(
      'is-success',
      'has-background-success-light'
    );

  }
  if (!input.hasAttribute('required') &&
    input.value.length > 0) {
    input.classList.add(
      'is-success',
      'has-background-success-light'
    );
  }
  if (input.hasAttribute('required') && !input.validity.valid) {
    input.classList.remove(
      'is-success',
      'has-background-success-light'
    );
    input.classList.add(
      'is-danger',
      'has-background-danger-light'
    );

  }

  if (input.validity.valueMissing) {
    input.classList.remove(
      'is-danger',
      'has-background-danger-light',
      'is-success',
      'has-background-success-light'
    );
  }
}

// check required inputs validity

function checkArray(arr) {
  if (
    nameInput.validity.valid &&
    emailInput.validity.valid
  ) {
    console.log('form is valid');
  } else {
    console.log('form invalid');
  }
};

// call validation function on each input change

inputs.forEach(input => {
  input.addEventListener('focusout', () => {
    validateInput(input);
  })
})

// apply validation logic on form submit

submitBtn.addEventListener('click', function(e) {
  checkArray(inputs);
  inputs.forEach(input => {
    if (!input.validity.valid) {
      input.classList.add(
        'is-danger',
        'has-background-danger-light'
      );
    }
  });
});



// function validateInput(input, icon) {
//   input.addEventListener('change', function(e) {
//     if(input.value.length > 0) {
//       nameIcon.classList.remove('fa-user')
//       nameIcon.classList.add('fa-check');
//       e.target.classList.add('is-success');
//       nameIcon.classList.add('has-text-success');
//     } else {
//       e.target.classList.remove('is-success');
//       nameIcon.classList.add('fa-user');
//       nameIcon.classList.remove('fa-check');
//       nameIcon.classList.remove('has-text-success');
//     }
//   });
// }
//
// function validateEmail(elementValue) {
//   const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//
//   return emailPattern.test(elementValue);
// }
//
// emailInput.addEventListener('change', function(e) {
//   validateEmail(emailInput);
// });
//
// validateInput(nameInput, nameIcon);
