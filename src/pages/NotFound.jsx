import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Card } from 'react-bootstrap';
import Footer from '../components/Footer';

function NotFound() {
  return (
    <>
      <Container className="mt-5">
        <Card className="text-danger text-center w-75 mx-auto my-auto">
          <Card.Header variant="top">
            <FontAwesomeIcon icon={faExclamationTriangle} size="6x" />
          </Card.Header>
          <Card.Body className="p-4">
            <Card.Title>Requested page could not found!</Card.Title>
            <Card.Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, totam?</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Card.Link className='text-decoration-none link-primary' href="/">Homepage</Card.Link>
          </Card.Footer>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

export default NotFound;
