const getId = (e) => e.parentElement.parentElement.parentElement.dataset.id;

const deleteBtn = document.querySelectorAll('.delete-btn');
deleteBtn.forEach((btn) =>
  btn.addEventListener('click', (e) => {
    console.log(getId(e.target));
  })
);
