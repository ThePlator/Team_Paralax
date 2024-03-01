import logo from "../img/logo.png"

export const Navbar = () => {
  const showMenu = () => {
    document.getElementById('navLinks').style.top = '0';
  };

  const hideMenu = () => {
    document.getElementById('navLinks').style.top = '-800px';
  };
  return (
    <section className="header">
    <nav>
      <a href="/"><img src={logo} alt="" /></a>
      <div className="nav-links" id="navLinks">
        <i className="fa-solid fa fa-xmark" onClick={hideMenu}></i>
        <ul>
          <li><a href="/">HOME</a></li>
          {/* <li><a href="./about.html">ABOUT</a></li> */}
          <li><a href="/scheduel">SCHEDULE</a></li>
          <li><a href="/adminlogin">ADMIN LOGIN</a></li>
        </ul>
      </div>
      <i className="fa-solid fa fa-bars" onClick={showMenu}></i>
    </nav>
  </section>
);
}
