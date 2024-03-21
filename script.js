'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// Tabbed component.
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Scrolling...
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Gaurd cluase
  if (!clicked) return;

  // Remove the active classes...
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab...
  clicked.classList.add('operations__tab--active');

  //Activate content area...
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
// Navigation
// Method. 1
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
// Method. 2
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Matching strategy
  const id = e.target.getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});
// Menu fade animation...
// const handleHover = function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = this;
//     });
//     logo.style.opacity = this;
//   }
// };
// nav.addEventListener('mouseover', handleHover.bind(0.5));
// nav.addEventListener('mouseout', handleHover.bind(1));
// // Sticky Navigation...
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: 0.1,
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// Menu fade animation user IntersectionObserver API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
// const header = document.querySelector('.header');
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   'We use cookies to improve functionality and analytics <button class="btn btn--close-cookie">Got It!</button>';
// header.append(message);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// Apply random color to header nav
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function () {
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav__links').addEventListener('click', function () {
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav').addEventListener('click', function () {
//   this.style.backgroundColor = randomColor();
// });
