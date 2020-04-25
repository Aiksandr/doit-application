import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './client.reducer';
import { IClient } from 'app/shared/model/client.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IClientUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ClientUpdate = (props: IClientUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { clientEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/client' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...clientEntity,
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
          <h2 id="doitApplicationApp.client.home.createOrEditLabel">
            <Translate contentKey="doitApplicationApp.client.home.createOrEditLabel">Create or edit a Client</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : clientEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="client-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="client-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="firstNameLabel" for="client-firstName">
                  <Translate contentKey="doitApplicationApp.client.firstName">First Name</Translate>
                </Label>
                <AvField
                  id="client-firstName"
                  type="text"
                  name="firstName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="client-lastName">
                  <Translate contentKey="doitApplicationApp.client.lastName">Last Name</Translate>
                </Label>
                <AvField
                  id="client-lastName"
                  type="text"
                  name="lastName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="client-email">
                  <Translate contentKey="doitApplicationApp.client.email">Email</Translate>
                </Label>
                <AvField
                  id="client-email"
                  type="text"
                  name="email"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="ageLabel" for="client-age">
                  <Translate contentKey="doitApplicationApp.client.age">Age</Translate>
                </Label>
                <AvField id="client-age" type="string" className="form-control" name="age" />
              </AvGroup>
              <AvGroup>
                <Label id="languageLabel" for="client-language">
                  <Translate contentKey="doitApplicationApp.client.language">Language</Translate>
                </Label>
                <AvInput
                  id="client-language"
                  type="select"
                  className="form-control"
                  name="language"
                  value={(!isNew && clientEntity.language) || 'ENGLISH'}
                >
                  <option value="ENGLISH">{translate('doitApplicationApp.Language.ENGLISH')}</option>
                  <option value="GREEK">{translate('doitApplicationApp.Language.GREEK')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="client-type">
                  <Translate contentKey="doitApplicationApp.client.type">Type</Translate>
                </Label>
                <AvInput
                  id="client-type"
                  type="select"
                  className="form-control"
                  name="type"
                  value={(!isNew && clientEntity.type) || 'CUSTOMER'}
                >
                  <option value="CUSTOMER">{translate('doitApplicationApp.ClientType.CUSTOMER')}</option>
                  <option value="PERFORMER">{translate('doitApplicationApp.ClientType.PERFORMER')}</option>
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/client" replace color="info">
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
  clientEntity: storeState.client.entity,
  loading: storeState.client.loading,
  updating: storeState.client.updating,
  updateSuccess: storeState.client.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ClientUpdate);
