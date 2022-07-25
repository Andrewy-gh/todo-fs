const events = (() => {
  const getId = (e) => e.parentElement.parentElement.parentElement.dataset.id;

  const projectBtn = () => {
    const projectBtn = document.querySelectorAll('.project-btn');
    projectBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        getProject(e.target.textContent);
      });
    });
  };

  const updateBtn = () => {
    const updateBtn = document.querySelectorAll('.update-btn');
    updateBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        console.log(getId(e.target));
        console.log(e.target);
      });
    });
  };

  const deleteBtn = () => {
    const deleteBtn = document.querySelectorAll('.delete-btn');
    deleteBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        deleteItem(getId(e.target));
      });
    });
  };

  const init = () => {
    projectBtn();
    updateBtn();
    deleteBtn();
  };

  return { init };
})();

events.init();

const getProject = async (project) => {
  const res = await fetch(`/projects/${project}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  });
};

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
    const msg = document.querySelector('#msg');
    msg.innerHTML = json;
    setTimeout(() => {
      msg.remove();
      window.location.reload(true);
    }, 1000);
  }
};
