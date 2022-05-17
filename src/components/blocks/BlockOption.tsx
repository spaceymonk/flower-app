import { Container, Row, Col, Badge, Tooltip } from 'react-bootstrap';
import CustomOverlay from '../common/CustomOverlay';
import PropTypes from 'prop-types';
import Block from '../../model/Block';

function BlockOption({ block }: BlockOptionProps) {
  return (
    <Container fluid className="px-0">
      <Row>
        <Col sm={3} className="d-flex justify-content-center align-items-center">
          <Badge className="rounded-pill" bg="info">
            {block.type}
          </Badge>
        </Col>
        {block.name ? (
          <>
            <CustomOverlay overlay={<Tooltip>{block.name}</Tooltip>}>
              <Col sm={6} className="text-truncate fw-bold small text-center">
                <span>{block.name}</span>
              </Col>
            </CustomOverlay>
            <CustomOverlay overlay={<Tooltip>{block.id}</Tooltip>}>
              <Col sm={3} className="text-truncate small text-muted fst-italic text-end-sm">
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
