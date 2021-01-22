import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Header(props) {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="#home">To Do</Navbar.Brand>
      <Nav className="mr-auto">
      <Nav.Link>Sign Out</Nav.Link>   
      </Nav>
      </Navbar>

  );
}

export default Header;
