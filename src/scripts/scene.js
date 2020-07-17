import Parallax from 'parallax-js';

export default () => {
  const scene = document.querySelector('.page__scene');
  const parallaxInstance = new Parallax(scene);
};
