const newBlogpostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blogpost-title').value.trim();
  const description = document.querySelector('#blogpost-description').value.trim();

  if (title && description) {
    const response = await fetch(`/api/blogpost`, {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create blogpost');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogpost/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to delete comment');
    }
  }
};

document
  .querySelector('.new-blogpost-form')
  .addEventListener('submit', newBlogpostHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
