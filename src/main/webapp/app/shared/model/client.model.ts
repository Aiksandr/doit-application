import { ILocation } from 'app/shared/model/location.model';
import { Language } from 'app/shared/model/enumerations/language.model';
import { ClientType } from 'app/shared/model/enumerations/client-type.model';

export interface IClient {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
  language?: Language;
  type?: ClientType;
  locations?: ILocation[];
}

export const defaultValue: Readonly<IClient> = {};
