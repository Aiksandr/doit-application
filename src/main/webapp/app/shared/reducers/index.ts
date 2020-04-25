import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from './user-management';
// prettier-ignore
import country, {
  CountryState
} from 'app/entities/country/country.reducer';
// prettier-ignore
import location, {
  LocationState
} from 'app/entities/location/location.reducer';
// prettier-ignore
import client, {
  ClientState
} from 'app/entities/client/client.reducer';
// prettier-ignore
import employee, {
  EmployeeState
} from 'app/entities/employee/employee.reducer';
// prettier-ignore
import category, {
  CategoryState
} from 'app/entities/category/category.reducer';
// prettier-ignore
import order, {
  OrderState
} from 'app/entities/order/order.reducer';
// prettier-ignore
import orderHistory, {
  OrderHistoryState
} from 'app/entities/order-history/order-history.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly country: CountryState;
  readonly location: LocationState;
  readonly client: ClientState;
  readonly employee: EmployeeState;
  readonly category: CategoryState;
  readonly order: OrderState;
  readonly orderHistory: OrderHistoryState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  country,
  location,
  client,
  employee,
  category,
  order,
  orderHistory,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
