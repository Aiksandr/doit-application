import { Moment } from 'moment';
import { IClient } from 'app/shared/model/client.model';

export interface IEmployee {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  hireDate?: Moment;
  client?: IClient;
}

export const defaultValue: Readonly<IEmployee> = {};
