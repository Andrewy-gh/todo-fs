const getId = (e) => e.parentElement.parentElement.parentElement.dataset.id;

const deleteBtn = document.querySelectorAll('.delete-btn');
deleteBtn.forEach((btn) =>
  btn.addEventListener('click', (e) => {
    deleteItem(getId(e.target));
  })
);

const deleteItem = async (id) => {
  const res = await fetch('/items', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      _id: id,
    }),
  });
  if (res.ok) {
    const json = await res.json();
    console.log(json);
    window.location.reload(true);
  }
};
