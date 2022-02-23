import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Card } from 'react-bootstrap';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import T from '../services/MessageConstants';

function NotFound() {
  return (
    <>
      <Navbar />

      <Container className="mt-5">
        <Card className="text-danger text-center w-75 mx-auto my-auto">
          <Card.Header variant="top">
            <FontAwesomeIcon icon={faExclamationTriangle} size="6x" />
          </Card.Header>
          <Card.Body className="p-4">
            <Card.Title>{T.notFound.title}</Card.Title>
            <Card.Text>{T.notFound.text}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Card.Link className="text-decoration-none link-primary" href="/">
              {T.notFound.homepage}
            </Card.Link>
          </Card.Footer>
        </Card>
      </Container>

      <Footer />
    </>
  );
}

export default NotFound;
