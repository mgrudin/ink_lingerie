import { gsap } from 'gsap';

export default () => {
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
};
