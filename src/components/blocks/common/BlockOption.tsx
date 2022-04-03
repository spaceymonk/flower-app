import { Container, Row, Col, Badge, Tooltip } from 'react-bootstrap';
import { Block } from '../../../types';
import CustomOverlay from '../../common/CustomOverlay';
import PropTypes from 'prop-types';

function BlockOption({ block }: BlockOptionProps) {
  return (
    <Container fluid className="px-0">
      <Row>
        <Col sm={3} className="d-flex justify-content-center align-items-center">
          <Badge className="rounded-pill" bg="info">
            {block.type}
          </Badge>
        </Col>
        {block.data.name ? (
          <>
            <CustomOverlay overlay={<Tooltip>{block.data.name}</Tooltip>}>
              <Col sm={6} className="text-truncate fw-bold small text-center">
                <span>{block.data.name}</span>
              </Col>
            </CustomOverlay>
            <CustomOverlay overlay={<Tooltip>{block.id}</Tooltip>}>
              <Col sm={3} className="text-truncate small text-muted fst-italic text-end">
                <span>{block.id}</span>
              </Col>
            </CustomOverlay>
          </>
        ) : (
          <CustomOverlay overlay={<Tooltip>{block.id}</Tooltip>}>
            <Col sm={9} className="small text-truncate">
              <span>{block.id}</span>
            </Col>
          </CustomOverlay>
        )}
      </Row>
    </Container>
  );
}

BlockOption.propTypes = {
  block: PropTypes.object.isRequired,
};

export interface BlockOptionProps {
  block: Block;
}

export default BlockOption;
