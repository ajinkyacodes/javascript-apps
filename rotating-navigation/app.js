const open = document.getElementById('open');
const close = document.getElementById('close');
const container = document.querySelector('.container');
const body = document.querySelector('body');

open.addEventListener('click', () => {
    body.style.overflow = 'hidden';
    container.classList.add('show-nav');
});


close.addEventListener('click', () => {
    body.style.overflow = 'auto';
    container.classList.remove('show-nav');
});

