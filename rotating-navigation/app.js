const open = document.getElementById('open');
const close = document.getElementById('close');
const container = document.querySelector('.container');
const body = document.querySelector('body');

open.addEventListener('click', () => {
    body.classList.add('scroll-lock');
    container.classList.add('show-nav');
});

close.addEventListener('click', () => {
    body.classList.remove('scroll-lock');
    container.classList.remove('show-nav');
});
