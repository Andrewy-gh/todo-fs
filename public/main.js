const events = (() => {
  const getId = (e) => e.parentElement.parentElement.parentElement.dataset.id;

  addProjectBtn = () => {
    const addProjectBtn = document.querySelector('#add-project');
    const addProjectForm = document.querySelector('#add-project-form');

    const cancelBtn = () => {
      const cancelBtn = document.querySelector('#cancel-btn');
      cancelBtn.addEventListener('click', () => {
        addProjectForm.classList.add('hidden');
        addProjectBtn.textContent = 'Add project';
      });
    };

    addProjectBtn.addEventListener('click', () => {
      addProjectForm.classList.toggle('hidden');
      addProjectBtn.textContent = '';
      cancelBtn();
    });
  };

  const updateBtn = () => {
    const updateBtn = document.querySelectorAll('.update-btn');
    updateBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const values = document.querySelectorAll(`[data-${getId(e.target)}]`);
        const req = {};
        req['_id'] = getId(e.target);
        req.data = {};
        Array.from(values).forEach(
          (v) =>
            (req.data[v.dataset[`${getId(e.target)}`]] =
              v.value || v.textContent)
        );
        updateItem(req);
      });
    });
  };

  const deleteBtn = () => {
    const deleteBtn = document.querySelectorAll('.delete-btn');
    deleteBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        // deleteItem(getId(e.target));
        serverRequest.deleteItem(getId(e.target));
      });
    });
  };

  const init = () => {
    updateBtn();
    deleteBtn();
    addProjectBtn();
  };

  return { init };
})();

events.init();

const serverRequest = (() => {
  const updateItem = async (req) => {
    const res = await fetch('/items', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        req,
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

  return {
    updateItem,
    deleteItem,
  };
})();
