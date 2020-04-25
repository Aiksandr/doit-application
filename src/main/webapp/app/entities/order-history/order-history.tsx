import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './order-history.reducer';
import { IOrderHistory } from 'app/shared/model/order-history.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOrderHistoryProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const OrderHistory = (props: IOrderHistoryProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { orderHistoryList, match, loading } = props;
  return (
    <div>
      <h2 id="order-history-heading">
        <Translate contentKey="doitApplicationApp.orderHistory.home.title">Order Histories</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="doitApplicationApp.orderHistory.home.createLabel">Create new Order History</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {orderHistoryList && orderHistoryList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="doitApplicationApp.orderHistory.oldStatus">Old Status</Translate>
                </th>
                <th>
                  <Translate contentKey="doitApplicationApp.orderHistory.newStatus">New Status</Translate>
                </th>
                <th>
                  <Translate contentKey="doitApplicationApp.orderHistory.createDate">Create Date</Translate>
                </th>
                <th>
                  <Translate contentKey="doitApplicationApp.orderHistory.order">Order</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {orderHistoryList.map((orderHistory, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${orderHistory.id}`} color="link" size="sm">
                      {orderHistory.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`doitApplicationApp.OrderStatus.${orderHistory.oldStatus}`} />
                  </td>
                  <td>
                    <Translate contentKey={`doitApplicationApp.OrderStatus.${orderHistory.newStatus}`} />
                  </td>
                  <td>
                    <TextFormat type="date" value={orderHistory.createDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{orderHistory.order ? <Link to={`order/${orderHistory.order.id}`}>{orderHistory.order.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${orderHistory.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${orderHistory.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${orderHistory.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="doitApplicationApp.orderHistory.home.notFound">No Order Histories found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ orderHistory }: IRootState) => ({
  orderHistoryList: orderHistory.entities,
  loading: orderHistory.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
