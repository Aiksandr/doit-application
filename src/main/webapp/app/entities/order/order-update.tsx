import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { IClient } from 'app/shared/model/client.model';
import { getEntities as getClients } from 'app/entities/client/client.reducer';
import { ILocation } from 'app/shared/model/location.model';
import { getEntities as getLocations } from 'app/entities/location/location.reducer';
import { getEntity, updateEntity, createEntity, reset } from './order.reducer';
import { IOrder } from 'app/shared/model/order.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOrderUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OrderUpdate = (props: IOrderUpdateProps) => {
  const [categoryId, setCategoryId] = useState('0');
  const [ownerId, setOwnerId] = useState('0');
  const [performerId, setPerformerId] = useState('0');
  const [locationId, setLocationId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { orderEntity, categories, clients, locations, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/order' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCategories();
    props.getClients();
    props.getLocations();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...orderEntity,
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
          <h2 id="doitApplicationApp.order.home.createOrEditLabel">
            <Translate contentKey="doitApplicationApp.order.home.createOrEditLabel">Create or edit a Order</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : orderEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="order-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="order-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="languageLabel" for="order-language">
                  <Translate contentKey="doitApplicationApp.order.language">Language</Translate>
                </Label>
                <AvInput
                  id="order-language"
                  type="select"
                  className="form-control"
                  name="language"
                  value={(!isNew && orderEntity.language) || 'ENGLISH'}
                >
                  <option value="ENGLISH">{translate('doitApplicationApp.Language.ENGLISH')}</option>
                  <option value="GREEK">{translate('doitApplicationApp.Language.GREEK')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="order-status">
                  <Translate contentKey="doitApplicationApp.order.status">Status</Translate>
                </Label>
                <AvInput
                  id="order-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && orderEntity.status) || 'INIT'}
                >
                  <option value="INIT">{translate('doitApplicationApp.OrderStatus.INIT')}</option>
                  <option value="WORK">{translate('doitApplicationApp.OrderStatus.WORK')}</option>
                  <option value="DONE">{translate('doitApplicationApp.OrderStatus.DONE')}</option>
                  <option value="CANCEL">{translate('doitApplicationApp.OrderStatus.CANCEL')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="titleLabel" for="order-title">
                  <Translate contentKey="doitApplicationApp.order.title">Title</Translate>
                </Label>
                <AvField id="order-title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="order-description">
                  <Translate contentKey="doitApplicationApp.order.description">Description</Translate>
                </Label>
                <AvField id="order-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="minPriceLabel" for="order-minPrice">
                  <Translate contentKey="doitApplicationApp.order.minPrice">Min Price</Translate>
                </Label>
                <AvField id="order-minPrice" type="string" className="form-control" name="minPrice" />
              </AvGroup>
              <AvGroup>
                <Label id="maxPriceLabel" for="order-maxPrice">
                  <Translate contentKey="doitApplicationApp.order.maxPrice">Max Price</Translate>
                </Label>
                <AvField id="order-maxPrice" type="string" className="form-control" name="maxPrice" />
              </AvGroup>
              <AvGroup>
                <Label for="order-category">
                  <Translate contentKey="doitApplicationApp.order.category">Category</Translate>
                </Label>
                <AvInput id="order-category" type="select" className="form-control" name="category.id">
                  <option value="" key="0" />
                  {categories
                    ? categories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="order-owner">
                  <Translate contentKey="doitApplicationApp.order.owner">Owner</Translate>
                </Label>
                <AvInput id="order-owner" type="select" className="form-control" name="owner.id">
                  <option value="" key="0" />
                  {clients
                    ? clients.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="order-performer">
                  <Translate contentKey="doitApplicationApp.order.performer">Performer</Translate>
                </Label>
                <AvInput id="order-performer" type="select" className="form-control" name="performer.id">
                  <option value="" key="0" />
                  {clients
                    ? clients.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="order-location">
                  <Translate contentKey="doitApplicationApp.order.location">Location</Translate>
                </Label>
                <AvInput id="order-location" type="select" className="form-control" name="location.id">
                  <option value="" key="0" />
                  {locations
                    ? locations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/order" replace color="info">
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
  categories: storeState.category.entities,
  clients: storeState.client.entities,
  locations: storeState.location.entities,
  orderEntity: storeState.order.entity,
  loading: storeState.order.loading,
  updating: storeState.order.updating,
  updateSuccess: storeState.order.updateSuccess
});

const mapDispatchToProps = {
  getCategories,
  getClients,
  getLocations,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OrderUpdate);
