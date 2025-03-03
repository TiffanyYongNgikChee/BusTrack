import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const UserMenu = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Nav className="me-auto">
              <Nav.Link href="/register">Register Face</Nav.Link>
              <Nav.Link href="/ticket">Buy Ticket</Nav.Link>
              <Nav.Link href="/camera">System Camera</Nav.Link>
              <Nav.Link href="/history">History/Record</Nav.Link>
            </Nav>
          </Container>
      </Navbar>
  );
  };
  
  export default UserMenu;