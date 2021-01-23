import './header.scss';

function Header(props) {
  return (
    <div className="topnav">
      <a className="active" href="#home">
        Home
      </a>
      <a href="#news">Sign Out</a>
      <a href="#about">About</a>
    </div>
  );
}

export default Header;
