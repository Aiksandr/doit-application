import { ICountry } from 'app/shared/model/country.model';
import { IClient } from 'app/shared/model/client.model';

export interface ILocation {
  id?: number;
  city?: string;
  area?: string;
  streetAddress?: string;
  postalCode?: string;
  country?: ICountry;
  client?: IClient;
}

export const defaultValue: Readonly<ILocation> = {};
