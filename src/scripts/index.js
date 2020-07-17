import Swiper from 'swiper';
import { gsap } from 'gsap';
import Parallax from 'parallax-js';

const swiper = new Swiper('.swiper', {
  speed: 1000,
  slidesPerView: 'auto',
  centeredSlides: true,
  loop: true,
  loopedSlides: 2,
  loopPreventsSlide: false,

  on: {
    init: () => {
      const photoPrev = document.querySelector('.page__photo--prev');
      const photoActive = document.querySelector('.page__photo--active');
      const photoNext = document.querySelector('.page__photo--next');

      const slidePrev = document.querySelector('.swiper-slide-prev');
      const slideActive = document.querySelector('.swiper-slide-active');
      const slideNext = document.querySelector('.swiper-slide-next');

      photoPrev.src = slidePrev.dataset.photoSrc;
      photoActive.src = slideActive.dataset.photoSrc;
      photoNext.src = slideNext.dataset.photoSrc;
    },
  },
});

swiper.on('slideChangeTransitionStart', function () {
  gsap.fromTo(
    '.page__photo--prev',
    { autoAlpha: 1 },
    { autoAlpha: 0, duration: 0.5, ease: 'power2' }
  );
  gsap.fromTo(
    '.page__photo--active',
    { autoAlpha: 1 },
    { autoAlpha: 0, duration: 0.5, ease: 'power2' }
  );
  gsap.fromTo(
    '.page__photo--next',
    { autoAlpha: 1 },
    { autoAlpha: 0, duration: 0.5, ease: 'power2' }
  );
});

swiper.on('slideChangeTransitionEnd', function () {
  const photoPrev = document.querySelector('.page__photo--prev');
  const photoActive = document.querySelector('.page__photo--active');
  const photoNext = document.querySelector('.page__photo--next');

  const slidePrev = document.querySelector('.swiper-slide-prev');
  const slideActive = document.querySelector('.swiper-slide-active');
  const slideNext = document.querySelector('.swiper-slide-next');

  photoPrev.src = slidePrev.dataset.photoSrc;
  photoActive.src = slideActive.dataset.photoSrc;
  photoNext.src = slideNext.dataset.photoSrc;

  gsap.fromTo(
    '.page__photo--prev',
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1.5, ease: 'power3' }
  );
  gsap.fromTo(
    '.page__photo--active',
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1.5, ease: 'power3' }
  );
  gsap.fromTo(
    '.page__photo--next',
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1.5, ease: 'power3' }
  );
});

const slider = document.querySelector('.swiper');

slider.addEventListener('mouseover', () => {
  gsap.to('.page__mouse-text', { autoAlpha: 1, duration: 1 });
});

slider.addEventListener('mousemove', (event) => {
  const mouseText = document.querySelector('.page__mouse-text');
  mouseText.style.left = event.clientX + 17 + 'px';
  mouseText.style.top = event.clientY - 8 + 'px';
});

slider.addEventListener('mouseout', () => {
  gsap.to('.page__mouse-text', { autoAlpha: 0, duration: 1 });
});

const scene = document.querySelector('.page__scene');
const parallaxInstance = new Parallax(scene);
