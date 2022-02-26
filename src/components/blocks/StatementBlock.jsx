import { faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
import { useReactFlow } from 'react-flow-renderer';
import T from '../../services/MessageConstants';

export function CreateButton({ className, showToast }) {
  const { setNodes, getNodes } = useReactFlow();

  function handleClick() {
    try {
      const node = create();
      setNodes(getNodes().concat(node));
      showToast({ title: T.blocks.statement.toastMsg });
    } catch {
      showToast({ title: T.blocks.errorTxt });
    }
  }
  return (
    <Card className={'small user-select-none clickable ' + className} onClick={handleClick}>
      <Card.Header>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <FontAwesomeIcon icon={faCode} />
          {T.blocks.statement.title}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text className='text-muted'>{T.blocks.statement.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

function create() {
  //todo
  return null;
}
