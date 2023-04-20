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

const blogpostHandler = async (event) => {
  
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const type = event.target.getAttribute('data-type')
    console.log(type)
    if(type == 1){
     deleteBlogpost(id);
     // delButtonHandler(id)
    }else{
      console.log("Update blogpost")
      getUpdateBlogpost(id);
    }

   }
};



const deleteBlogpost = async (id) => {
    const response = await fetch(`/api/blogpost/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete comment');
    }
};

const getUpdateBlogpost = async (id) => {
  const updateSection = document.querySelector('.hidden');
  updateSection.style.display = 'block'
}

document
  .querySelector('.new-blogpost-form')
  .addEventListener('submit', newBlogpostHandler);

document
  .querySelector('.blogpost-list')
  .addEventListener('click', blogpostHandler);


