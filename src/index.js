import { lestur, load } from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    console.log('lestur keyra');
    lestur();
  } else {
    console.log('java is on');
    load();
  }
});
