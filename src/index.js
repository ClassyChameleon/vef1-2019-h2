import load from './lib/list';
import lestur from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    lestur();
  } else {
    console.log('java is on');
    load();
  }
});
