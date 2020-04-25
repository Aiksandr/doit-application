import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './order-history.reducer';
import { IOrderHistory } from 'app/shared/model/order-history.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOrderHistoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OrderHistoryDetail = (props: IOrderHistoryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { orderHistoryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="doitApplicationApp.orderHistory.detail.title">OrderHistory</Translate> [<b>{orderHistoryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="oldStatus">
              <Translate contentKey="doitApplicationApp.orderHistory.oldStatus">Old Status</Translate>
            </span>
          </dt>
          <dd>{orderHistoryEntity.oldStatus}</dd>
          <dt>
            <span id="newStatus">
              <Translate contentKey="doitApplicationApp.orderHistory.newStatus">New Status</Translate>
            </span>
          </dt>
          <dd>{orderHistoryEntity.newStatus}</dd>
          <dt>
            <span id="createDate">
              <Translate contentKey="doitApplicationApp.orderHistory.createDate">Create Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={orderHistoryEntity.createDate} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="doitApplicationApp.orderHistory.order">Order</Translate>
          </dt>
          <dd>{orderHistoryEntity.order ? orderHistoryEntity.order.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/order-history" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/order-history/${orderHistoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ orderHistory }: IRootState) => ({
  orderHistoryEntity: orderHistory.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryDetail);
