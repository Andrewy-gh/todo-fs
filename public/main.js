const test = () => {
  const btn = document.querySelector('#btn');
  btn.addEventListener('click', () => {
    const text = document.querySelector('#text');
    text.classList.toggle('red');
  });
};

test();
