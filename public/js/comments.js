const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('.comment-text').value.trim();
   
  
    if (comment) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({comment}),
       //body: comment,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        //document.location.replace('/blogpost/3');
        document.location.reload();
      } else {
        alert('Failed to create comment');
      }
    }
  };

document
  .querySelector('.comment-form').addEventListener('submit', newCommentHandler);