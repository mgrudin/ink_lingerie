import Swiper from 'swiper';
import { gsap } from 'gsap';

export default () => {
  const swiper = new Swiper('.swiper', {
    speed: 1000,
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    loopedSlides: 2,
    loopPreventsSlide: false,

    on: {
      init: () => {
        if (window.screen.width >= 768) {
          const photoPrev = document.querySelector('.page__photo--prev');
          const photoActive = document.querySelector('.page__photo--active');
          const photoNext = document.querySelector('.page__photo--next');

          const slidePrev = document.querySelector('.swiper-slide-prev');
          const slideActive = document.querySelector('.swiper-slide-active');
          const slideNext = document.querySelector('.swiper-slide-next');

          photoPrev.src = slidePrev.dataset.photoSrc;
          photoActive.src = slideActive.dataset.photoSrc;
          photoNext.src = slideNext.dataset.photoSrc;
        } else {
          const photoMobile = document.querySelector('.page__photo--mobile');
          const slideActive = document.querySelector('.swiper-slide-active');
          photoMobile.src = slideActive.dataset.photoSrc;
        }
      },
    },
  });

  swiper.on('slideChangeTransitionStart', () => {
    if (window.screen.width >= 768) {
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
    } else {
      gsap.fromTo(
        '.page__photo--mobile',
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 0.5, ease: 'power2' }
      );
    }
  });

  swiper.on('slideChangeTransitionEnd', () => {
    if (window.screen.width >= 768) {
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
        { autoAlpha: 1, duration: 2, ease: 'power3' }
      );
      gsap.fromTo(
        '.page__photo--active',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 2, ease: 'power3' }
      );
      gsap.fromTo(
        '.page__photo--next',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 2, ease: 'power3' }
      );
    } else {
      const photoMobile = document.querySelector('.page__photo--mobile');
      const slideActive = document.querySelector('.swiper-slide-active');
      photoMobile.src = slideActive.dataset.photoSrc;

      gsap.fromTo(
        '.page__photo--mobile',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1.5, ease: 'power3' }
      );
    }
  });
};
