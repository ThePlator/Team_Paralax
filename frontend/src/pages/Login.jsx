

// Set predefined values in localStorage
localStorage.setItem('email1', 'admin@gmail.com');
localStorage.setItem('password1', '987654321');

const Login = () => {
  const login = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const storedEmail = localStorage.getItem('email1');
    const storedPassword = localStorage.getItem('password1');

    if (email === storedEmail && password === storedPassword) {
      // window.location.href = 'Dashboard.html';
      window.open('/dashboard');
      console.log("It's correct");
    } else {
      alert('Incorrect Email or Password');
    }
  };

  return (
    <div className="myform">
      <div className="wrapper">
      <header className="login_head">Login Form</header>
      <form action="#">
        <div className="field email">
          <div className="input-area">
            <input type="email" placeholder="Email Address" id="email" />
            <i className="icon fas fa-envelope"></i>
            <i className="error error-icon fas fa-exclamation-circle"></i>
          </div>
        </div>
        <div className="field password">
          <div className="input-area">
            <input type="password" placeholder="Password" id="password" />
            <i className="icon fas fa-lock"></i>
            <i className="error error-icon fas fa-exclamation-circle"></i>
          </div>
        </div>

        <button type="submit" className="login" onClick={login}>
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

export default Login;
