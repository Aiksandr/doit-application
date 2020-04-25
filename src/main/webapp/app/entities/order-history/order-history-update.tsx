import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IOrder } from 'app/shared/model/order.model';
import { getEntities as getOrders } from 'app/entities/order/order.reducer';
import { getEntity, updateEntity, createEntity, reset } from './order-history.reducer';
import { IOrderHistory } from 'app/shared/model/order-history.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOrderHistoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OrderHistoryUpdate = (props: IOrderHistoryUpdateProps) => {
  const [orderId, setOrderId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { orderHistoryEntity, orders, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/order-history');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getOrders();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.createDate = convertDateTimeToServer(values.createDate);

    if (errors.length === 0) {
      const entity = {
        ...orderHistoryEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="doitApplicationApp.orderHistory.home.createOrEditLabel">
            <Translate contentKey="doitApplicationApp.orderHistory.home.createOrEditLabel">Create or edit a OrderHistory</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : orderHistoryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="order-history-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="order-history-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="oldStatusLabel" for="order-history-oldStatus">
                  <Translate contentKey="doitApplicationApp.orderHistory.oldStatus">Old Status</Translate>
                </Label>
                <AvInput
                  id="order-history-oldStatus"
                  type="select"
                  className="form-control"
                  name="oldStatus"
                  value={(!isNew && orderHistoryEntity.oldStatus) || 'INIT'}
                >
                  <option value="INIT">{translate('doitApplicationApp.OrderStatus.INIT')}</option>
                  <option value="WORK">{translate('doitApplicationApp.OrderStatus.WORK')}</option>
                  <option value="DONE">{translate('doitApplicationApp.OrderStatus.DONE')}</option>
                  <option value="CANCEL">{translate('doitApplicationApp.OrderStatus.CANCEL')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="newStatusLabel" for="order-history-newStatus">
                  <Translate contentKey="doitApplicationApp.orderHistory.newStatus">New Status</Translate>
                </Label>
                <AvInput
                  id="order-history-newStatus"
                  type="select"
                  className="form-control"
                  name="newStatus"
                  value={(!isNew && orderHistoryEntity.newStatus) || 'INIT'}
                >
                  <option value="INIT">{translate('doitApplicationApp.OrderStatus.INIT')}</option>
                  <option value="WORK">{translate('doitApplicationApp.OrderStatus.WORK')}</option>
                  <option value="DONE">{translate('doitApplicationApp.OrderStatus.DONE')}</option>
                  <option value="CANCEL">{translate('doitApplicationApp.OrderStatus.CANCEL')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="createDateLabel" for="order-history-createDate">
                  <Translate contentKey="doitApplicationApp.orderHistory.createDate">Create Date</Translate>
                </Label>
                <AvInput
                  id="order-history-createDate"
                  type="datetime-local"
                  className="form-control"
                  name="createDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.orderHistoryEntity.createDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="order-history-order">
                  <Translate contentKey="doitApplicationApp.orderHistory.order">Order</Translate>
                </Label>
                <AvInput id="order-history-order" type="select" className="form-control" name="order.id">
                  <option value="" key="0" />
                  {orders
                    ? orders.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/order-history" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  orders: storeState.order.entities,
  orderHistoryEntity: storeState.orderHistory.entity,
  loading: storeState.orderHistory.loading,
  updating: storeState.orderHistory.updating,
  updateSuccess: storeState.orderHistory.updateSuccess
});

const mapDispatchToProps = {
  getOrders,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryUpdate);
