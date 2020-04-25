import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './order.reducer';
import { IOrder } from 'app/shared/model/order.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOrderDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OrderDetail = (props: IOrderDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { orderEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="doitApplicationApp.order.detail.title">Order</Translate> [<b>{orderEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="language">
              <Translate contentKey="doitApplicationApp.order.language">Language</Translate>
            </span>
          </dt>
          <dd>{orderEntity.language}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="doitApplicationApp.order.status">Status</Translate>
            </span>
          </dt>
          <dd>{orderEntity.status}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="doitApplicationApp.order.title">Title</Translate>
            </span>
          </dt>
          <dd>{orderEntity.title}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="doitApplicationApp.order.description">Description</Translate>
            </span>
          </dt>
          <dd>{orderEntity.description}</dd>
          <dt>
            <span id="minPrice">
              <Translate contentKey="doitApplicationApp.order.minPrice">Min Price</Translate>
            </span>
          </dt>
          <dd>{orderEntity.minPrice}</dd>
          <dt>
            <span id="maxPrice">
              <Translate contentKey="doitApplicationApp.order.maxPrice">Max Price</Translate>
            </span>
          </dt>
          <dd>{orderEntity.maxPrice}</dd>
          <dt>
            <Translate contentKey="doitApplicationApp.order.category">Category</Translate>
          </dt>
          <dd>{orderEntity.category ? orderEntity.category.id : ''}</dd>
          <dt>
            <Translate contentKey="doitApplicationApp.order.owner">Owner</Translate>
          </dt>
          <dd>{orderEntity.owner ? orderEntity.owner.id : ''}</dd>
          <dt>
            <Translate contentKey="doitApplicationApp.order.performer">Performer</Translate>
          </dt>
          <dd>{orderEntity.performer ? orderEntity.performer.id : ''}</dd>
          <dt>
            <Translate contentKey="doitApplicationApp.order.location">Location</Translate>
          </dt>
          <dd>{orderEntity.location ? orderEntity.location.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/order" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/order/${orderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ order }: IRootState) => ({
  orderEntity: order.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
