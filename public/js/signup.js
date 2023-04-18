const signupFormHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if(password.length < 8){
      document.getElementById("error").innerHTML = "Password must be at least 8 characters"
      return;
    }



    
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        document.getElementById("error").innerHTML = "Unable to create user"
      }
    }
  };


  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler)