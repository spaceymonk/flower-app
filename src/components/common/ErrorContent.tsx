import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import T from '../../config/MessageConstants';

export function ErrorContent({ title, message }: ErrorContentProps) {
  return (
    <div className="mt-5">
      <Card className="text-danger text-center w-75 mx-auto my-auto">
        <Card.Header>
          <FontAwesomeIcon icon={faExclamationTriangle} size="6x" />
        </Card.Header>
        <Card.Body className="p-4">
          <Card.Title>{title}</Card.Title>
          <Card.Text>{message}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Card.Link className="text-decoration-none link-primary" href="/">
            {T.app.homepage}
          </Card.Link>
        </Card.Footer>
      </Card>
    </div>
  );
}

ErrorContent.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export interface ErrorContentProps extends PropTypes.InferProps<typeof ErrorContent.propTypes> {}
